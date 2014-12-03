class User < ActiveRecord::Base
  validates :session_token, presence: true
  has_many :images
  has_many :memes
end
