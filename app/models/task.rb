class Task < ApplicationRecord
  # foreign_key: 紐付け先Tableのカラム名, primary_key: 自分のTableにある結合用のカラム名
  has_one :user, foreign_key: 'user_id', primary_key: 'user_id', class_name: 'User'
end
