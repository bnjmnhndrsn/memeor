class Meme < ActiveRecord::Base
  has_attached_file :cached_image, :styles => {
      :feed => "144x144#",
  }
  
  validates_attachment_content_type :cached_image, :content_type => /\Aimage/
  
  belongs_to :image
  belongs_to :user
  before_save :randomize_file_name
  has_many :captions, inverse_of: :meme, dependent: :destroy
  
  accepts_nested_attributes_for :captions, reject_if: proc { |attributes| attributes['content'].nil? || attributes['content'].blank? }
  
  private
  
  def randomize_file_name
    self.cached_image.instance_write(:file_name, "#{SecureRandom::urlsafe_base64(8)}.png")
  end
end
