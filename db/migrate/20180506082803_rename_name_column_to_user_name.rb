class RenameNameColumnToUserName < ActiveRecord::Migration[5.2]
  def change
    # テーブル名, 変更前のカラム名, 変更後のカラム名
    rename_column :users, :name, :u_name
    rename_column :tasks, :name, :t_name
  end
end
