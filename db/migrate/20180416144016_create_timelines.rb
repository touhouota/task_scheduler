class CreateTimelines < ActiveRecord::Migration[5.2]
  def change
    create_table :timelines do |t|
      t.text :content
      t.integer :task_id
      t.text :user_id
      t.integer :auto, limit: 1

      t.timestamps
    end
  end
end
