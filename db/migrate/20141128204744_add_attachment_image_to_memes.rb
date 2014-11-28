class AddAttachmentImageToMemes < ActiveRecord::Migration
  def self.up
    change_table :memes do |t|
      t.attachment :cached_image
    end
  end

  def self.down
    remove_attachment :memes, :cached_image
  end
end
