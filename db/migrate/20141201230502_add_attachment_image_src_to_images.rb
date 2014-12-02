class AddAttachmentImageSrcToImages < ActiveRecord::Migration
  def self.up
    change_table :images do |t|
      t.attachment :image_src
    end
  end

  def self.down
    remove_attachment :images, :image_src
  end
end
