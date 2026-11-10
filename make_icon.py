import zlib, struct, math
CX, CY, ANG = 0.5, 0.52, math.radians(-12)
IN = [(0.30, 0.34), (0.70, 0.34), (0.50, 0.70)]
R = 0.085
def seg(px, py, a, b):
    ax, ay = a; bx, by = b
    dx, dy = bx - ax, by - ay
    t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - ax - t * dx, py - ay - t * dy)
def tri_dist(px, py):
    s = []
    for i in range(3):
        a, b = IN[i], IN[(i + 1) % 3]
        s.append((b[0] - a[0]) * (py - a[1]) - (b[1] - a[1]) * (px - a[0]))
    if all(v >= 0 for v in s) or all(v <= 0 for v in s):
        return 0.0
    return min(seg(px, py, IN[i], IN[(i + 1) % 3]) for i in range(3))
def clamp(v): return 0.0 if v < 0 else 1.0 if v > 1 else v
def render(n):
    ca, sa = math.cos(ANG), math.sin(ANG)
    rows = []
    for py in range(n):
        row = bytearray()
        for px in range(n):
            x, y = (px + 0.5) / n, (py + 0.5) / n
            g = max(0.0, 1 - math.hypot(x - 0.5, y - 0.58) / 0.55) ** 2
            r, gg, b = 10 + 30 * g, 12 + 90 * g, 20 + 200 * g
            dx, dy = x - CX, y - CY
            u, v = CX + dx * ca + dy * sa, CY - dx * sa + dy * ca
            if 0.1 < u < 0.9 and 0.15 < v < 0.9:
                d = tri_dist(u, v) - R
                cov = clamp(0.5 - d * n)
                if cov > 0:
                    t = clamp((u - 0.2) * 0.9 + (v - 0.25) * 0.9)
                    pr, pg, pb = 42 + (123 - 42) * t, 171 + (108 - 171) * t, 238 + (255 - 238) * t
                    h = clamp(1 - (v - 0.26) / 0.16) * 0.28
                    pr, pg, pb = pr + (255 - pr) * h, pg + (255 - pg) * h, pb + (255 - pb) * h
                    for cx in (0.43, 0.5, 0.57):
                        dd = math.hypot(u - cx, v - 0.455) - 0.026
                        c2 = clamp(0.5 - dd * n)
                        if c2 > 0:
                            pr, pg, pb = pr + (255 - pr) * c2, pg + (255 - pg) * c2, pb + (255 - pb) * c2
                    r, gg, b = r + (pr - r) * cov, gg + (pg - gg) * cov, b + (pb - b) * cov
            row += bytes((int(r), int(gg), int(b)))
        rows.append(row)
    return rows
def save(path, n):
    raw = b''.join(b'\x00' + bytes(r) for r in render(n))
    def ch(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    open(path, 'wb').write(b'\x89PNG\r\n\x1a\n' + ch(b'IHDR', struct.pack('>IIBBBBB', n, n, 8, 2, 0, 0, 0)) + ch(b'IDAT', zlib.compress(raw, 9)) + ch(b'IEND', b''))
save('static/icon-192.png', 192)
save('static/icon-512.png', 512)
print('icons ok')
