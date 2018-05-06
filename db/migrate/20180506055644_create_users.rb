class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :name
      t.index :user_id, unique: true

      t.timestamps
    end
  end
end
