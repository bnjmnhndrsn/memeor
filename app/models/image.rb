class Image < ActiveRecord::Base
  has_many :memes, dependent: :destroy
  has_attached_file :image_src,  :styles => {
      :meme => "600x600>"
  }
  validates_attachment_content_type :image_src, :content_type => /\Aimage\/.*\Z/
  before_save :extract_dimensions
  
  private

  def extract_dimensions
    tempfile = image_src.queued_for_write[:meme]
    unless tempfile.nil?
      geometry = Paperclip::Geometry.from_file(tempfile)
      self.width, self.height = geometry.width.to_i, geometry.height.to_i
    end
  end
end
