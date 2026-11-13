from flask import request, jsonify

def init(app, load, save, auth, err, LOCK):
    def card(d, un):
        u = d['users'].get(un)
        if not u:
            return None
        return {'username': un, 'name': u['name'], 'bio': u.get('bio', '')}

    @app.get('/api/users')
    def users_search():
        q = request.args.get('q', '').strip().lower()
        if len(q) < 2:
            return jsonify(items=[])
        with LOCK:
            d = load()
            me, t = auth(d)
            if not me:
                return err('وارد نشده‌ای', 401)
            mine = set(d.setdefault('contacts', {}).get(me, []))
            out = []
            for un, u in d['users'].items():
                if un == me:
                    continue
                if q in un or q in u['name'].lower():
                    c = card(d, un)
                    c['added'] = un in mine
                    out.append(c)
                if len(out) >= 20:
                    break
            return jsonify(items=out)

    @app.get('/api/contacts')
    def contacts_list():
        with LOCK:
            d = load()
            me, t = auth(d)
            if not me:
                return err('وارد نشده‌ای', 401)
            items = [card(d, un) for un in d.setdefault('contacts', {}).get(me, [])]
            return jsonify(items=[c for c in items if c])

    @app.post('/api/contacts')
    def contacts_add():
        j = request.get_json(silent=True) or {}
        un = str(j.get('username', '')).strip().lower()
        with LOCK:
            d = load()
            me, t = auth(d)
            if not me:
                return err('وارد نشده‌ای', 401)
            if un == me or un not in d['users']:
                return err('کاربر پیدا نشد', 404)
            lst = d.setdefault('contacts', {}).setdefault(me, [])
            if un not in lst:
                lst.append(un)
                save(d)
            return jsonify(item=card(d, un))

    @app.post('/api/contacts/<un>/delete')
    def contacts_delete(un):
        with LOCK:
            d = load()
            me, t = auth(d)
            if not me:
                return err('وارد نشده‌ای', 401)
            lst = d.setdefault('contacts', {}).get(me, [])
            d['contacts'][me] = [x for x in lst if x != un]
            save(d)
            return jsonify(ok=1)
