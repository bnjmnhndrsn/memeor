json.extract!(meme, :id, :title, :cached_image, :created_at, :updated_at, :styling, :user_id, :public, :image_id)
json.cached_image_feed meme.cached_image.url(:feed)
json.time_words time_ago_in_words(meme.created_at)