set :server_name, 'mimalab.fun.ac.jp'

role :app, fetch(:server_name).to_s
role :web, fetch(:server_name).to_s
role :db, fetch(:server_name).to_s
