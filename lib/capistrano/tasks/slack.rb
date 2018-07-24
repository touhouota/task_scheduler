namespace :slack do
  desc 'Slackを止めて、つけ直す'
  task :start do
    on roles(:web) do
      invoke 'slack:disconnect'
      invoke 'slack:connect'
    end
  end

  desc 'Slackへの接続をする'
  task :connect do
    on roles(:web) do
      execute "cd #{fetch :deploy_to}/current; (nohup bundle exec rails slack_bot:connect < /dev/null > /dev/null & echo $! > #{fetch :slack_pid})"
    end
  end

  desc '接続を切る'
  task :disconnect do
    on roles(:web) do
      begin
        pid = capture "cat #{fetch :slack_pid}"
        execute :kill, "-9 #{pid}"
      rescue StandardError => e
        puts "#{e.class} |||| #{e.message}"
      end
    end
  end
end

after 'puma:restart', 'slack:start'
