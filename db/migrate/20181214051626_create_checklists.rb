class CreateChecklists < ActiveRecord::Migration[5.2]
  def change
    create_table :checklists do |t|
      t.string :user_id
      t.string :box_name

      t.timestamps
    end
  end
end
