class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :name
      t.integer :group

      t.timestamps
    end
  end
end
