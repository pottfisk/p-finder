
from PIL import Image, ImageOps, ImageDraw
from PIL import ImageFont
import json
import time
import numpy as np
import cv2
size = (130, 130)
circle_mask = Image.new('L', size, 0)
draw = ImageDraw.Draw(circle_mask) 
draw.ellipse((0, 0) + size, fill=255)

def render_from_file(image,old_personer):
    with open("./personer/personer.json") as json_personer:
        person_data = json.load(json_personer)
        if person_data != old_personer:
            old_personer = person_data
            for person in person_data["personer"]:
                person_image = Image.open(person["bilder"][0])
                person_image = ImageOps.fit(person_image, size,centering=(0.5,0.5),method=Image.ANTIALIAS)
                person_image.putalpha(circle_mask)
                top = round(float(person["position"][0])*image.height) 
                left = round(float(person["position"][1])*image.width)     
                image.paste(person_image, (left, top),mask=person_image)
    return old_personer,image

def main():
    old_personer = None
    while(True):  
        image = Image.open("kartor/karta_hd.png")
        old_personer = render_from_file(image,old_personer)
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        image = cv2.rotate(image,cv2.ROTATE_90_COUNTERCLOCKWISE)
        cv2.namedWindow('image',cv2.WND_PROP_FULLSCREEN)
        cv2.setWindowProperty('image', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
        cv2.imshow('image',image)

        cv2.waitKey(1)


if __name__ == "__main__":
    main()



