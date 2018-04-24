# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 初期のユーザデータの定義
[
  { user_id: 'test1', name: 'テスト1', group: nil },
  { user_id: 'test2', name: 'テスト2', group: nil },
  { user_id: 'test3', name: 'テスト3', group: nil },
  { user_id: 'test4', name: 'テスト4', group: nil },
  { user_id: 'test5', name: 'テスト5', group: nil },
  { user_id: 'test6', name: 'テスト6', group: nil },
  { user_id: 'test7', name: 'テスト7', group: nil }
].each do |user|
  User.create(user)
end

# タスクのデータ
[
  {
    user_id: 'test1',
    name: 'タスクのテスト1',
    status: 0,
    expect_minute: 30,
    memo: 'タスクをとりあえず入れてみて、どうなるかのテスト'
  },
  {
    user_id: 'test2',
    name: 'test2のテスト1',
    status: 0,
    expect_minute: 20,
    memo: 'タスクの例'
  },
  {
    user_id: 'test1',
    name: 'タスクのテスト2',
    status: 0,
    expect_minute: 40,
    memo: 'タスクー'
  }
].each do |task|
  Task.create(task)
end
