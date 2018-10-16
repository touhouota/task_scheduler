Rails.application.routes.draw do
  # scope 'b1013179' do
  #   scope 'task_scheduler' do
  get '/', to: 'login#index'
  get '/api/logout', to: 'api#logout'
  get '/tasks', to: 'tasks#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # ユーザ一覧
  # get '/users/', to: 'users#index'
  resources :users, param: :user_id

  # ユーザの情報
  # get '/users/:id', to: 'users#show', as: 'user_info'

  # ログイン画面
  get '/login', to: 'login#index'
  # ログイン処理
  post '/api/login', to: 'login#login'

  # メイン画面
  get '/main/:user_id', to: 'main_page#index'

  # タスクの構造を可視化するページ
  get '/structure/main/:user_id', to: 'task_structure#index'

  # 個人の週間振り返り
  get '/reflection/week/:user_id', to: 'week_reflection#index'
  # 個人のこれまでの振り返り
  get '/reflection/individual/:user_id', to: 'reflection#index'
  # 仲間との比較ページ
  get '/reflection/members/:user_id', to: 'reflection#members'

  # API用のルート
  get '/api/tasks', to: 'task_structure#tasks'
  get '/api/tasks/:user_id', to: 'task_structure#user_tasks'
  post '/api/tasks/create', to: 'task_structure#insert_task'
  get '/api/tasks/membersTask/:user_id', to: 'task_structure#getMembersTask'
  post '/api/task/statusChange', to: 'task_structure#statusChange'
  post '/api/task/modify', to: 'task_structure#taskModify'
  get '/api/week/:date/:user_id', to: 'week_reflection#week_reflection'
  get '/api/individual/:user_id', to: 'reflection#graph_data'
  get '/api/members/:user_id', to: 'reflection#all_user_information'
  #   end
  # end
end
