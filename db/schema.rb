# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141203193103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "captions", force: true do |t|
    t.integer  "meme_id"
    t.text     "content",    null: false
    t.text     "styling"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "images", force: true do |t|
    t.string   "title",                  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_src_file_name"
    t.string   "image_src_content_type"
    t.integer  "image_src_file_size"
    t.datetime "image_src_updated_at"
    t.integer  "width"
    t.integer  "height"
    t.integer  "user_id",                null: false
  end

  create_table "memes", force: true do |t|
    t.string   "title"
    t.integer  "image_id",                  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cached_image_file_name"
    t.string   "cached_image_content_type"
    t.integer  "cached_image_file_size"
    t.datetime "cached_image_updated_at"
    t.text     "styling"
    t.integer  "user_id",                   null: false
  end

  create_table "users", force: true do |t|
    t.boolean  "anon",            null: false
    t.string   "username"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "session_token",   null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
