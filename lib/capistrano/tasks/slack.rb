namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    # load Rails.root.join('config', 'Slack_bot.rb')
    on roles(:web) do
      execute cd "#{deploy_to}/current; bundle exec ruby -e 'puts(Dir.pwd)'}"
    end
  end
end

after 'puma:restart', 'slack:connect'
