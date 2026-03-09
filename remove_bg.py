from PIL import Image

def remove_black(in_path, out_path, threshold=25):
    img = Image.open(in_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    for item in data:
        r, g, b, a = item
        intensity = max(r, g, b)
        if intensity < threshold:
            new_data.append((r, g, b, 0))
        elif intensity < threshold + 30:
            alpha = int((intensity - threshold) / 30.0 * 255)
            # Retain the original color, just reduce opacity for anti-aliasing
            new_data.append((r, g, b, alpha))
        else:
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    img.save(out_path, "PNG")

remove_black('public/images/logo.png', 'public/images/logo_transparent.png')
print("Done")
