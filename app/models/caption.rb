class Caption < ActiveRecord::Base
  validates :meme, :content, presence: true
  belongs_to :meme
end
