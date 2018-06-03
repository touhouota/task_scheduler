class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  # ログイン処理
  def login
    user_id = params[:user_id]
    @user = User.find_by(user_id: user_id)
    if @user
      render json: @user
    else
      render json: {
        u_name: 'ないよ'
      }
    end
  end

  # タスクの一覧を取得する
  def tasks
    @tasks = Task.all

    render json: @tasks
  end

  # 特定のユーザ
  def user_tasks
    user_id = params[:user_id]
    @tasks = Task.where(user_id: user_id, deleted: 0)

    # タイムラインを追加
    tl_insert

    # クライアント側にデータを返す
    render json: @tasks
  end

  def insert_task
    task_info = {
      t_name: params[:task_name],
      memo: params[:task_memo],
      label: params[:task_label],
      expect_minute: params[:expect_minute]
    }
    user = User.find_by(user_id: params[:user_id])
    @task = user.tasks.build(task_info)
    if @task.save
      # TLを追加
      # tl_insert(task_id: @task.id)
      render json: @task
    else
      render json: @task.errors
    end
  end

  def statusChange
    @task = Task.find(params[:id])
    @task.status = params[:status]
    @task.actual_sec = params[:actual_sec]

    if @task.save
      # TLを追加
      tl_insert({ task_id: @task.id }, @task.status)

      render json: @task
    else
      render json: @task.errors
    end
  end

  private

  # 引数で受け取ったものをマージしてTLを作る
  def tl_insert(hash = {}, status = nil)
    tl_content = "#{params[:controller]}\##{params[:action]}"
    tl_content += ",status:#{status}" if status

    tl_item = hash.merge(
      user_id: cookies[:user_id],
      auto: 1,
      content: tl_content
    )
    insert_timeline(tl_item)
  end
end
