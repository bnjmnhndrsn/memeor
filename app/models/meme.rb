class Meme < ActiveRecord::Base
  belongs_to :image
  has_many :captions
  
end
