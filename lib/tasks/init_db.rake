namespace :init_db do
  desc '初期のユーザを追加'
  task user: :environment do
    load File.join(Rails.root, 'db', 'initialize_data.rb')
    init_user
  end

  task task: :environment do
    load File.join(Rails.root, 'db', 'initialize_data.rb')
    init_task
  end
end
