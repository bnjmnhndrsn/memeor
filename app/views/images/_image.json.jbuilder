json.extract!(image, :id, :title, :width, :height, :updated_at, :user_id)
json.image_src image.image_src.url(:meme)
json.image_src_feed image.image_src.url(:feed)
json.image_src_thumb image.image_src.url(:thumb)
json.total_memes image.memes.count
