class Image < ActiveRecord::Base
  has_many :memes, dependent: :destroy
  belongs_to :user
  
  has_attached_file :image_src,  :styles => {
      :meme => "500x500>",
      :feed => "200x200#",
      :thumb => "100x100#"
  }
  
  validates_attachment_content_type :image_src, :content_type => /\Aimage\/.*\Z/
  before_create :randomize_file_name
  before_save :extract_dimensions
  
  
  def self.by_memes_count
    Image
    .select('images.*')
    .joins(:memes)
    .group("images.id")
    .order("COALESCE(COUNT(memes.id), 0) DESC")
  end
  
  private
  
  def randomize_file_name
    extension = File.extname(image_src_file_name).downcase
    self.image_src.instance_write(:file_name, "#{SecureRandom::urlsafe_base64(8)}#{extension}")
  end

  def extract_dimensions
    tempfile = image_src.queued_for_write[:meme]
    unless tempfile.nil?
      geometry = Paperclip::Geometry.from_file(tempfile)
      self.width, self.height = geometry.width.to_i, geometry.height.to_i
    end
  end
end
