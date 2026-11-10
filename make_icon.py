import zlib, struct
TAIL=[(0.34,0.64),(0.28,0.80),(0.50,0.67)]
def inside(x,y,p):
    c=False; j=len(p)-1
    for i in range(len(p)):
        xi,yi=p[i]; xj,yj=p[j]
        if (yi>y)!=(yj>y) and x<(xj-xi)*(y-yi)/(yj-yi)+xi: c=not c
        j=i
    return c
def rr(x,y,cx,cy,hw,hh,r):
    dx=max(abs(x-cx)-(hw-r),0); dy=max(abs(y-cy)-(hh-r),0)
    return dx*dx+dy*dy<=r*r
def letter(x,y):
    if y>=0.37:
        e=((x-0.5)/0.16)**2+((y-0.37)/0.11)**2
        i=((x-0.5)/0.11)**2+((y-0.37)/0.06)**2
        if e<=1 and i>=1: return True
    for cx,cy in ((0.45,0.515),(0.55,0.515),(0.5,0.565)):
        if (x-cx)**2+(y-cy)**2<=0.028**2: return True
    return False
def render(s):
    rows=[]
    for py in range(s):
        r=bytearray()
        for px in range(s):
            t=(px+py)/(2*s)
            bg=(45-15*t,170-30*t,240-30*t)
            w=l=0
            if 0.18<px/s<0.82 and 0.21<py/s<0.82:
                for dx in (0.25,0.75):
                    for dy in (0.25,0.75):
                        x=(px+dx)/s; y=(py+dy)/s
                        if letter(x,y): l+=1
                        elif rr(x,y,0.5,0.45,0.30,0.22,0.12) or inside(x,y,TAIL): w+=1
            b=4-w-l
            for k in range(3):
                r.append(int((bg[k]*b+255*w+(36,140,205)[k]*l)/4))
        rows.append(r)
    return rows
def save(path,s):
    raw=b''.join(b'\x00'+bytes(r) for r in render(s))
    def ch(t,d):
        return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
    open(path,'wb').write(b'\x89PNG\r\n\x1a\n'+ch(b'IHDR',struct.pack('>IIBBBBB',s,s,8,2,0,0,0))+ch(b'IDAT',zlib.compress(raw,9))+ch(b'IEND',b''))
save('static/icon-192.png',192)
save('static/icon-512.png',512)
print('icons ok')
