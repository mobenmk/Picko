from flask import Flask, request, jsonify
import json, os, time
app = Flask(__name__, static_folder='static', static_url_path='')
DB = 'db.json'

def load():
    if os.path.exists(DB):
        return json.load(open(DB))
    return {"users": {}, "msgs": []}

def save(d):
    json.dump(d, open(DB, 'w'), ensure_ascii=False)

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

@app.post('/register')
def register():
    d = load()
    u = request.json['user'].strip()
    if not u or u in d['users']:
        return jsonify(error='taken'), 400
    d['users'][u] = {'t': time.time()}
    save(d)
    return jsonify(ok=1)

@app.post('/send')
def send():
    d = load()
    j = request.json
    m = {'id': len(d['msgs']) + 1, 'from': j['from'],
         'to': j['to'], 'text': j['text'], 't': time.time()}
    d['msgs'].append(m)
    save(d)
    return jsonify(m)

@app.get('/msgs')
def msgs():
    d = load()
    u = request.args['user']
    after = int(request.args.get('after', 0))
    return jsonify([m for m in d['msgs']
                    if m['id'] > after and u in (m['from'], m['to'])])

app.run(host='0.0.0.0', port=5000)
