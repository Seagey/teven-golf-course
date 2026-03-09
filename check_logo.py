from PIL import Image

def analyze(path):
    img = Image.open(path).convert("RGBA")
    r_total, g_total, b_total = 0, 0, 0
    count = 0
    for r, g, b, a in img.getdata():
        if a > 128:
            r_total += r
            g_total += g
            b_total += b
            count += 1
    if count == 0:
        print(f"{path}: transparent or empty")
        return
    avg_r = r_total / count
    avg_g = g_total / count
    avg_b = b_total / count
    if avg_r > 128 and avg_g > 128 and avg_b > 128:
        print(f"{path}: WHITE")
    else:
        print(f"{path}: BLACK")

analyze('public/images/logo_1.png')
analyze('public/images/logo_2.png')
