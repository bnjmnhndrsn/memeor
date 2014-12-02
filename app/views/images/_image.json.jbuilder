json.extract!(image, :id, :title)
json.image_src image.image_src.url(:meme)