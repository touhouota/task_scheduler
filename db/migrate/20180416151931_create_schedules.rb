class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.integer :task_id # 紐づくタスク
      t.string :user_id     # 念のためUserも
      t.date :start_date    # 期間の開始日
      t.date :deadline      # 期間の最終日
      t.date :finish_date   # 終了日
      t.integer :deleted # 削除されたか？(0: false, 1: true)

      t.timestamps
    end
  end
end
