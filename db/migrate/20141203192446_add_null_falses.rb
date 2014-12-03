class AddNullFalses < ActiveRecord::Migration
  def change
    change_column :captions, :content, :text, null: false
    change_column :images, :title, :string, null: false
    change_column :images, :user_id, :integer, null: false
    change_column :memes, :image_id, :integer, null: false
    change_column :memes, :user_id, :integer, null: false
    change_column :users, :anon, :boolean, null: false
    change_column :users, :session_token, :string, null: false    
  end
end
