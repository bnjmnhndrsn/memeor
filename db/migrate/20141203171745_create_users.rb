class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.boolean :anon
      t.string :username
      t.string :password_digest
      
      t.timestamps
    end
  end
end
