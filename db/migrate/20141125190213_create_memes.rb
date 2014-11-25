class CreateMemes < ActiveRecord::Migration
  def change
    create_table :memes do |t|
      t.string :title
      t.integer :image_id, null: false
      
      t.timestamps
    end
  end
end
