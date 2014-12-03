class Image < ActiveRecord::Base
  has_many :memes, dependent: :destroy
  belongs_to :user
  
  has_attached_file :image_src,  :styles => {
      :meme => "500x500>",
      :feed => "200x200#",
      :thumb => "100x100#"
  }
  
  validates_attachment_content_type :image_src, :content_type => /\Aimage\/.*\Z/
  before_save :extract_dimensions
  
  
  def self.by_memes_count
    Image
    .select('images.*, COUNT(memes.id) AS memes_count')
    .joins(:memes)
    .group("images.id")
    .having("memes_count > 0")
    .order("memes_count DESC")
  end
  
  private

  def extract_dimensions
    tempfile = image_src.queued_for_write[:meme]
    unless tempfile.nil?
      geometry = Paperclip::Geometry.from_file(tempfile)
      self.width, self.height = geometry.width.to_i, geometry.height.to_i
    end
  end
end
