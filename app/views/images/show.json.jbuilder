json.partial! 'images/image', image: @image
json.memes do 
	json.array! @image.memes do |meme|
		next unless meme.public
		json.partial! 'memes/meme', meme: meme
	end
end
json.time_words time_ago_in_words(@image.created_at)