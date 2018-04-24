class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :user_id     # ユーザID
      t.string :name        # タスク名
      t.integer :status         # タスク状態
      t.integer :expect_minute  # 予想時間
      t.integer :actual_sec     # 作業時間
      t.text :memo          # 作業メモ
      t.text :reflection    # 振り返りメモ
      t.integer :deleted

      t.timestamps
    end
  end
end
