set :server_name, 'mimalab.c.fun.ac.jp'
set :rails_env, 'production'

role :app, "b1013179@#{fetch(:server_name)}"
role :web, "b1013179@#{fetch(:server_name)}"
role :db, "b1013179@#{fetch(:server_name)}"
