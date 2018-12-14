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

ActiveRecord::Schema.define(version: 2018_12_14_051626) do

  create_table "checklists", force: :cascade do |t|
    t.string "user_id"
    t.string "box_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.integer "task_id"
    t.string "user_id"
    t.date "start_date"
    t.date "deadline"
    t.date "finish_date"
    t.integer "deleted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "user_id"
    t.string "t_name"
    t.integer "status", default: 0
    t.integer "expect_minute", default: 0
    t.integer "actual_sec", default: 0
    t.text "memo"
    t.text "reflection"
    t.string "label"
    t.integer "deleted", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timelines", force: :cascade do |t|
    t.text "content"
    t.integer "task_id"
    t.text "user_id"
    t.integer "auto", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "user_id"
    t.string "u_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slack_id"
    t.index ["user_id"], name: "index_users_on_user_id", unique: true
  end

end
