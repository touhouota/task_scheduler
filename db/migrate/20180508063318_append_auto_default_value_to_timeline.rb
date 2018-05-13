class AppendAutoDefaultValueToTimeline < ActiveRecord::Migration[5.2]
  def change
    change_column :timelines, :auto, :integer, default: 0
  end
end
