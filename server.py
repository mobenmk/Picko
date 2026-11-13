from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json, os, re, secrets, threading, time

app = Flask(__name__, static_folder='static', static_url_path='')
DB = 'db.json'
LOCK = threading.Lock()

def load():
    d = json.load(open(DB)) if os.path.exists(DB) else {}
    d.setdefault('users', {})
    d.setdefault('tokens', {})
    d.setdefault('msgs', [])
    return d

def save(d):
    json.dump(d, open(DB, 'w'), ensure_ascii=False)

def pub(u, un):
    return {'username': un, 'name': u['name'], 'bio': u.get('bio', ''), 'created': u['created']}

def auth(d):
    h = request.headers.get('Authorization', '')
    t = h[7:] if h.startswith('Bearer ') else ''
    un = d['tokens'].get(t)
    if un and un in d['users']:
        return un, t
    return None, None

def err(msg, code=400):
    return jsonify(error=msg), code

@app.after_request
def nc(r):
    r.headers['Cache-Control'] = 'no-cache'
    return r

@app.get('/')
def home():
    return app.send_static_file('index.html')

@app.get('/ping')
def ping():
    return 'ok'

@app.post('/api/register')
def register():
    j = request.get_json(silent=True) or {}
    un = str(j.get('username', '')).strip().lower()
    pw = str(j.get('password', ''))
    name = str(j.get('name', '')).strip()
    if not re.fullmatch(r'[a-z0-9_]{3,20}', un):
        return err('نام کاربری باید ۳ تا ۲۰ حرف انگلیسی، عدد یا _ باشد')
    if len(pw) < 6:
        return err('رمز عبور حداقل ۶ کاراکتر باشد')
    if not 1 <= len(name) <= 30:
        return err('نام نمایشی را وارد کن')
    with LOCK:
        d = load()
        if un in d['users']:
            return err('این نام کاربری قبلاً گرفته شده')
        d['users'][un] = {'name': name, 'bio': '', 'created': time.time(),
                          'pw': generate_password_hash(pw, method='pbkdf2:sha256')}
        t = secrets.token_hex(24)
        d['tokens'][t] = un
        save(d)
        return jsonify(token=t, user=pub(d['users'][un], un))

@app.post('/api/login')
def login():
    j = request.get_json(silent=True) or {}
    un = str(j.get('username', '')).strip().lower()
    pw = str(j.get('password', ''))
    with LOCK:
        d = load()
        u = d['users'].get(un)
        ok = bool(u) and check_password_hash(u['pw'], pw)
        if ok:
            t = secrets.token_hex(24)
            d['tokens'][t] = un
            save(d)
    if not ok:
        time.sleep(0.6)
        return err('نام کاربری یا رمز عبور اشتباه است', 401)
    return jsonify(token=t, user=pub(u, un))

@app.get('/api/me')
def me():
    with LOCK:
        d = load()
        un, t = auth(d)
        if not un:
            return err('وارد نشده‌ای', 401)
        return jsonify(user=pub(d['users'][un], un))

@app.post('/api/me')
def update_me():
    j = request.get_json(silent=True) or {}
    with LOCK:
        d = load()
        un, t = auth(d)
        if not un:
            return err('وارد نشده‌ای', 401)
        name = str(j.get('name', '')).strip()
        if not 1 <= len(name) <= 30:
            return err('نام نمایشی معتبر نیست')
        d['users'][un]['name'] = name
        d['users'][un]['bio'] = str(j.get('bio', ''))[:120]
        save(d)
        return jsonify(user=pub(d['users'][un], un))

@app.post('/api/logout')
def logout():
    with LOCK:
        d = load()
        un, t = auth(d)
        if un:
            d['tokens'].pop(t, None)
            save(d)
    return jsonify(ok=1)

import saved, acct; saved.init(app, load, save, auth, err, LOCK); acct.init(app, load, save, auth, err, LOCK); import contacts; contacts.init(app, load, save, auth, err, LOCK)
app.run(host='0.0.0.0', port=5000)
