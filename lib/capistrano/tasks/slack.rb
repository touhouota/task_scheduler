namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    on roles(:web) do
      execute "cd #{deploy_to}/current; bundle exec rails slack_bot:connect"
    end
  end
end

after 'puma:restart', 'slack:connect'
