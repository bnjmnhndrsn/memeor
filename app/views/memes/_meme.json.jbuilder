json.extract!(meme, :id, :title)
json.image do 
	json.partial! 'images/image', image: meme.image
end
json.captions do
	json.array! meme.captions, partial: 'captions/caption', as: :caption
end