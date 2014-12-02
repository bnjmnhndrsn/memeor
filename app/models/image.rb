class Image < ActiveRecord::Base
  has_many :memes, dependent: :destroy
  has_attached_file :image_src, :default_url => "/images/doge.png"
  validates_attachment_content_type :image_src, :content_type => /\Aimage\/.*\Z/
end
