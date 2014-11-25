class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :title
      t.string :src, null: false

      t.timestamps
    end
  end
end
