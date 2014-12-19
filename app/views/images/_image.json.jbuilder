json.extract!(image, :id, :title, :width, :height, :updated_at, :created_at, :user_id, :public)
json.image_src image.image_src.url(:meme)
json.image_src_feed image.image_src.url(:feed)
json.image_src_thumb image.image_src.url(:thumb)
json.image_src_full image.image_src.url
json.memes_count image.memes.count
