class DropSrcFromImages < ActiveRecord::Migration
  def change
     remove_column :images, :src
  end
end
