class AddPublicColumn < ActiveRecord::Migration
  def change
    add_column :images, :public, :boolean, default: true, null: false
    add_column :memes, :public, :boolean, default: true, null: false
  end
end
