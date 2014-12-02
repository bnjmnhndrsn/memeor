json.extract!(image, :id, :title, :width, :height)
json.image_src image.image_src.url(:meme)