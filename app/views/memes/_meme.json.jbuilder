json.extract!(meme, :id, :title, :cached_image)
json.image do 
	json.partial! 'images/image', image: meme.image
end
json.captions do
	json.array! meme.captions, partial: 'captions/caption', as: :caption
end