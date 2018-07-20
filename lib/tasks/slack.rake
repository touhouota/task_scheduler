namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    load Rails.root.join('config', 'Slack_bot.rb')
  end
end
