namespace :init_db do
  desc '初期のユーザを追加'
  task user: :environment do
    load File.join(Rails.root, 'db', 'initialize_data.rb')
    init_user
  end

  desc 'タスクデータを追加'
  task task: :environment do
    load File.join(Rails.root, 'db', 'initialize_data.rb')
    init_task
  end

  desc 'slackのidを付加, init_db:slack_user_list[token_string]'
  task :slack_user_list, 'token'
  task slack_id: :environment do |_t, _args|
    url = "https://slack.com/api/users.list?token=#{token}"
    response = JSON.parse(HTTP.get(url), symbolize_names: true)

    puts response[:members].map { |hash| { slack_id: hash[:id], real_name: hash[:real_name] } }
  end

  desc 'ファイルをもとに、DBにslack_idを挿入していく, init_db:slack_id_insert[filepath]'
  task :slack_id_insert, 'filepath'
  task slack_id_insert: :environment do |_t, args|
    yml = YAML.load_file(args['filepath'])
    yml.each do |user_id, hash|
      user = User.find_by(user_id: user_id)
      if user
        user.slack_id = hash[:slack_id]
        user.save!
      end
      p user
    end
  end
end
