
from PIL import Image, ImageOps, ImageDraw
from PIL import ImageFont
import json

size = (55, 55)
circle_mask = Image.new('L', size, 0)
draw = ImageDraw.Draw(circle_mask) 
draw.ellipse((0, 0) + size, fill=255)

image = Image.open("kartor/karta1.png")
#image = image.rotate(90)
#image = image.resize((1920,1080),Image.ANTIALIAS)

with open("./personer/personer.json") as json_personer:
    person_data = json.load(json_personer)
    for person in person_data["personer"]:
        person_image = Image.open(person["bilder"][0])
        person_image = ImageOps.fit(person_image, size,centering=(0.5,0.5),method=Image.ANTIALIAS)
        draw = ImageDraw.Draw(person_image)
        draw.ellipse((0,0) + size, outline="black",width=4)
        person_image = person_image.rotate(90)

        person_image.putalpha(circle_mask)

        image.paste(person_image, (person["position"][0],person["position"][1]),mask=person_image)

#robert = Image.open("personer/robert.jpg")
#robert = robert.resize(size,Image.ANTIALIAS)
#output = robert.rotate(90)
#robert = ImageOps.fit(robert, circle_mask.size, centering=(0.5,0.5))
#output.putalpha(circle_mask)
#image.paste(output,(1250,500),mask=output)
image.save("test.png")



