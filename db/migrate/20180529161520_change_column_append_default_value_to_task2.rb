class ChangeColumnAppendDefaultValueToTask2 < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :expect_minute, :integer, default: 0
  end
end
