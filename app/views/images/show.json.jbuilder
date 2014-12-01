json.partial! 'images/image', image: @image
json.memes do 
	json.array! @image.memes, partial: 'memes/meme', as: :meme
end