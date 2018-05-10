class CreateTimelines < ActiveRecord::Migration[5.2]
  def change
    create_table :timelines do |t|
      t.text :content # 行動やコメントなどの内容
      t.integer :task_id # タスク関連の場合はIDを持たせる
      t.text :user_id # 行動主
      t.integer :auto, limit: 1 # 自動: 1, ユーザ： 0

      t.timestamps
    end
  end
end
