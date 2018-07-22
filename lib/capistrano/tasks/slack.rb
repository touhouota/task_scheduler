namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    on roles(:web) do
      execute "cd #{deploy_to}/current; nohup bundle exec rails slack_bot:connect &; echo !$ > #{fetch[:slack_pid]}"
    end
  end

  desc '接続を切る'
  task :disconnect do
    on roles(:web) do
      # execute :kill, '-9 '
    end
  end
end

after 'puma:restart', 'slack:connect'
