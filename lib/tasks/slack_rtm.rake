namespace :slack_bot do
  desc 'Slackへの接続をする'
  task :connect do
    # p Dir.pwd
    # p Rails.root.to_s
    load Rails.root.join('config', 'Slack_bot.rb')
    # load './config/Slack_bot.rb'
  end
end
