namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    # load Rails.root.join('config', 'Slack_bot.rb')
    on roles(:web) do
      execute <<-EOC
      cd #{deploy_to}/current; bundle exec ruby config/Slack_bot.rb}
      EOC
    end
  end
end

after 'puma:restart', 'slack:connect'
