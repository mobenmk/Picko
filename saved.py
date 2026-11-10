import secrets, time
from flask import request, jsonify

def init(app, load, save, auth, err, LOCK):
    def uname(d):
        un, t = auth(d)
        return un

    @app.get('/api/saved')
    def saved_list():
        with LOCK:
            d = load()
            un = uname(d)
            if not un:
                return err('وارد نشده‌ای', 401)
            items = d.setdefault('saved', {}).get(un, [])
            return jsonify(items=items)

    @app.post('/api/saved')
    def saved_add():
        j = request.get_json(silent=True) or {}
        text = str(j.get('text', '')).strip()
        if not text or len(text) > 4000:
            return err('متن پیام معتبر نیست')
        with LOCK:
            d = load()
            un = uname(d)
            if not un:
                return err('وارد نشده‌ای', 401)
            m = {'id': secrets.token_hex(4), 'text': text, 't': time.time()}
            d.setdefault('saved', {}).setdefault(un, []).append(m)
            save(d)
            return jsonify(item=m)

    @app.post('/api/saved/<mid>')
    def saved_edit(mid):
        j = request.get_json(silent=True) or {}
        text = str(j.get('text', '')).strip()
        if not text or len(text) > 4000:
            return err('متن پیام معتبر نیست')
        with LOCK:
            d = load()
            un = uname(d)
            if not un:
                return err('وارد نشده‌ای', 401)
            for m in d.setdefault('saved', {}).get(un, []):
                if m['id'] == mid:
                    m['text'] = text
                    m['edited'] = True
                    save(d)
                    return jsonify(item=m)
            return err('پیام پیدا نشد', 404)

    @app.post('/api/saved/<mid>/delete')
    def saved_delete(mid):
        with LOCK:
            d = load()
            un = uname(d)
            if not un:
                return err('وارد نشده‌ای', 401)
            lst = d.setdefault('saved', {}).get(un, [])
            d['saved'][un] = [m for m in lst if m['id'] != mid]
            save(d)
            return jsonify(ok=1)
