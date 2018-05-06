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
[
  {
    user_id: 'user1',
    name: 'タスクのテスト1',
    status: 0,
    label: 'survay',
    expect_minute: 30,
    memo: 'タスクをとりあえず入れてみて、どうなるかのテスト'
  },
  {
    user_id: 'user2',
    name: 'user2のテスト1',
    status: 0,
    label: 'survay',
    expect_minute: 20,
    memo: 'タスクの例'
  },
  {
    user_id: 'user1',
    name: 'タスクのテスト2',
    status: 0,
    label: 'survay',
    expect_minute: 40,
    memo: 'タスクー'
  }
].each do |task|
  # user = User.find_by(user_id: task[:user_id])
  # task = Task.new(task)
  # user.tasks.save
end
