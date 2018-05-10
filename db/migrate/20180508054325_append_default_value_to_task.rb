class AppendDefaultValueToTask < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :status, :integer, default: 0
    change_column :tasks, :deleted, :integer, default: 0
  end
end
