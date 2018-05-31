class ChangeColumnAppendDefaultValueToTask < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :actual_sec, :integer, default: 0
  end
end
