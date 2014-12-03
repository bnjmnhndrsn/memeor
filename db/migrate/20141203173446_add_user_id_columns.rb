class AddUserIdColumns < ActiveRecord::Migration
  def change
    add_column :images, :user_id, :interger
    add_column :memes, :user_id, :interger
  end
end
