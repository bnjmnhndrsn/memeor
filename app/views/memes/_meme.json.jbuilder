json.extract!(meme, :id, :title, :cached_image, :created_at, :updated_at)
json.image do 
	json.partial! 'images/image', image: meme.image
end
json.captions do
	json.array! meme.captions, partial: 'captions/caption', as: :caption
end
json.time_words time_ago_in_words(meme.created_at)