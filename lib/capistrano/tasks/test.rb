namespace :test do
  desc 'ssh connection test'
  task :start do
    on roles(:app) do
      execute 'echo `hostname`'
    end
  end
end
