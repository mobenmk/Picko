from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash

def init(app, load, save, auth, err, LOCK):
    @app.post('/api/password')
    def change_password():
        j = request.get_json(silent=True) or {}
        old = str(j.get('old', ''))
        new = str(j.get('new', ''))
        if len(new) < 6:
            return err('رمز جدید حداقل ۶ کاراکتر باشد')
        with LOCK:
            d = load()
            un, t = auth(d)
            if not un:
                return err('وارد نشده‌ای', 401)
            u = d['users'][un]
            if not check_password_hash(u['pw'], old):
                return err('رمز فعلی اشتباه است', 403)
            u['pw'] = generate_password_hash(new, method='pbkdf2:sha256')
            d['tokens'] = {k: v for k, v in d['tokens'].items() if v != un or k == t}
            save(d)
            return jsonify(ok=1)
