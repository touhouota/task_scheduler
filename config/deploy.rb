# config valid for current version and patch releases of Capistrano
lock '~> 3.11.0'

set :application, 'task_scheduler'
set :repo_url, 'https://github.com/touhouota/task_scheduler.git'

set :branch, 'development'
# set :branch, 'slack_bot'
set :user, 'b1013179'
set :deploy_to, '/home/b1013179/task_scheduler'
set :stage, 'production'
set :keep_releases, 5

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'public/upload', 'vendor/bundle'

append :linked_files, 'config/database.yml', 'config/master.key'

# slack_botを処理するプロセスIDを置く場所を決めておく
set :slack_pid, "#{shared_path}/tmp/pids/slack.pid"

set :puma_threads, [4, 16]
set :puma_workers, 0
# pumaが口を明けていてほしいところを指定する
# set :puma_bind, "#{shared_path}/tmp/sockets/puma.sock"
set :puma_bind, 'tcp://localhost:3000'
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid, "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log, "#{shared_path}/log/puma_error.log"
