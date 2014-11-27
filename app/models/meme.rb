class Meme < ActiveRecord::Base
  belongs_to :image
  has_many :captions, inverse_of: :meme
  
  accepts_nested_attributes_for :captions, reject_if: proc { |attributes| attributes['content'].nil? || attributes['content'].blank? }
end
