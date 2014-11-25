class CreateCaptions < ActiveRecord::Migration
  def change
    create_table :captions do |t|
      
      t.integer :meme_id
      t.text :content
      t.text :styling
      
      t.timestamps
    end
  end
end
