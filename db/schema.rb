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

ActiveRecord::Schema.define(version: 20_180_416_151_931) do
  create_table 'schedules', force: :cascade do |t|
    t.integer 'task_id'
    t.string 'user_id'
    t.date 'start_date'
    t.date 'deadline'
    t.date 'finish_date'
    t.integer 'deleted'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'tasks', force: :cascade do |t|
    t.string 'user_id'
    t.string 'name'
    t.integer 'status'
    t.string 'label'
    t.integer 'expect_minute'
    t.integer 'actual_sec'
    t.text 'memo'
    t.text 'reflection'
    t.integer 'deleted'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'timelines', force: :cascade do |t|
    t.text 'content'
    t.integer 'task_id'
    t.text 'user_id'
    t.integer 'auto', limit: 1
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string 'user_id'
    t.string 'name'
    t.integer 'group'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
