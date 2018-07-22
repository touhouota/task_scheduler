namespace :slack do
  desc 'Slackへの接続をする'
  task :connect do
    on roles(:web) do
      execute "cd #{deploy_to}/current; nohup bundle exec rails slack_bot:connect &"
    end
  end

  desc '接続を切る'
  task :disconnect do
    on roles(:web) do
      execute :kill, "-9 #{`ps x | grep slack_bot:connect`.split("\n").select { |str| str.include?('/usr') }.first.split(' ').first}"
    end
  end
end

after 'puma:restart', 'slack:connect'
