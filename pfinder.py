
from PIL import Image, ImageOps, ImageDraw
from PIL import ImageFont
import json
import time

size = (55, 55)
circle_mask = Image.new('L', size, 0)
draw = ImageDraw.Draw(circle_mask) 
draw.ellipse((0, 0) + size, fill=255)


def render_from_file(image):
    with open("./personer/personer.json") as json_personer:
        person_data = json.load(json_personer)
        for person in person_data["personer"]:
            person_image = Image.open(person["bilder"][0])
            person_image = ImageOps.fit(person_image, size,centering=(0.5,0.5),method=Image.ANTIALIAS)
            #draw = ImageDraw.Draw(person_image)
            #draw.ellipse((0,0) + size, outline="black",width=4)
            person_image = person_image.rotate(90)

            person_image.putalpha(circle_mask)
            image.paste(person_image, (person["position"][0],person["position"][1]),mask=person_image)

            


def main():
    while(True):
        time.sleep(5)  
        image = Image.open("kartor/karta1.png")
        image = image.resize((1920,1920),Image.ANTIALIAS).rotate(90)
        render_from_file(image)
        image.save("test.png")


if __name__ == "__main__":
    main()



