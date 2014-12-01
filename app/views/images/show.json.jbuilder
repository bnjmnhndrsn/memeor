json.partial! 'images/image', image: @image
json.memes do 
	json.array! @image.memes, partial: 'memes/meme', as: :meme
end
json.time_words time_ago_in_words(@image.created_at)
json.total_memes @image.memes.count
