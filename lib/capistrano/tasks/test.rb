namespace :test do
  desc 'ssh connection test'
  task :start do
    on roles(:app) do
      execute 'touch hoge.txt'
    end
  end
end
