json.extract!(image, :id, :title, :width, :height)
json.image_src image.image_src.url(:meme)
json.image_src_feed image.image_src.url(:feed)
json.image_src_thumb image.image_src.url(:thumb)