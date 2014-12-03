class AddUserIdColumns < ActiveRecord::Migration
  def change
    add_column :images, :user_id, :integer
    add_column :memes, :user_id, :integer
  end
end
