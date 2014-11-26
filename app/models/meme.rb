class Meme < ActiveRecord::Base
  belongs_to :image
  has_many :captions
  
  accepts_nested_attributes_for :captions
end
