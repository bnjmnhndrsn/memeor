class Image < ActiveRecord::Base
  has_many :memes, dependent: :destroy
end
