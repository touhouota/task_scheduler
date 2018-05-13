Rails.application.routes.draw do
  get 'tasks/', to: 'tasks#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # ユーザ一覧
  # get '/users/', to: 'users#index'
  resources :users, param: :user_id
  # ユーザの情報
  # get '/users/:id', to: 'users#show', as: 'user_info'

  # メイン画面
  get '/main/:user_id/', to: 'main_page#index'

  # API用のルート
  get '/api/tasks', to: 'api#tasks'
  post '/api/tasks/create/', to: 'api#insert_task'
  post '/api/task/statusChange/', to: 'api#statusChange'
end
