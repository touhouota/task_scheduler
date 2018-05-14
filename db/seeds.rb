# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 初期のユーザデータの定義

[
  { user_id: 'user1', u_name: 'ユーザ1' },
  { user_id: 'user2', u_name: 'ユーザ2' },
  { user_id: 'user3', u_name: 'ユーザ3' },
  { user_id: 'user4', u_name: 'ユーザ4' },
  { user_id: 'user5', u_name: 'ユーザ5' },
  { user_id: 'user6', u_name: 'ユーザ6' },
  { user_id: 'user7', u_name: 'ユーザ7' }
].each do |user|
  User.create(user)
end

# タスクのデータ
# [].each do |task|
#   Task.create(task)
# end
