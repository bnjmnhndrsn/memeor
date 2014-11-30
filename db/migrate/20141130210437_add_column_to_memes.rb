class AddColumnToMemes < ActiveRecord::Migration
  def change
    add_column :memes, :styling, :text
  end
end
