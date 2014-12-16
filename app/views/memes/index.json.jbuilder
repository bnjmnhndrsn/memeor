if @include_images
  json.array! @memes, partial: 'memes/meme', as: :meme
else
  json.array! @memes, partial: 'memes/imageless_meme', as: :meme
end