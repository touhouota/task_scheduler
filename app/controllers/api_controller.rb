class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  # ログイン処理
  def login
    user_id = params[:user_id]
    @user = User.find_by(user_id: user_id)
    if @user
      cookies.signed[:user_id] = {
        value: @user.user_id,
        path: '/b1013179/task_scheduler',
        expires: 1.month.from_now
      }
      # render json: @user
      redirect_to '/b1013179/task_scheduler/structure/main/' + @user.user_id
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
    @tasks = Task.where(user_id: user_id, deleted: 0, status: [0, 1, 4])

    # タイムラインを追加
    tl_insert

    # クライアント側にデータを返す
    render json: @tasks
  end

  def insert_task
    task_info = task_params
    user = User.find_by(user_id: params[:user_id])
    @task = user.tasks.build(task_info)
    if @task.save
      # TLを追加
      tl_insert(task_id: @task.id)
      render json: @task
    else
      render json: @task.errors
    end
  end

  def taskModify
    @task = Task.find(params[:id])
    task_info = task_params
    @task.update_attributes(task_info)
    if @task.save
      tl_insert(task_id: @task.id)
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

  def getMembersTask
    result = []

    members = Task.joins(:user).select(:u_name, :user_id).group(:user_id)
    members.each do |member|
      # 取得したモデルをhashに変換
      user = member.attributes
      # タスクの総数
      sql = 'user_id = ? '
      user[:task_num] = Task.where(sql, member.user_id).count
      # 終了したものの数
      sql += 'and status in (2, 3)'
      user[:finish_num] = Task.where(sql, member.user_id).count
      result.push(user)
    end

    render json: result
  end

  private

  # 引数で受け取ったものをマージしてTLを作る
  def tl_insert(hash = {}, status = nil)
    tl_content = "#{params[:controller]}\##{params[:action]}"
    tl_content += ",status:#{status}" if status

    tl_item = hash.merge(
      user_id: params[:user_id],
      auto: 1,
      content: tl_content
    )
    insert_timeline(tl_item)
  end

  def task_params_permit
    params.permit(:task_name, :task_label, :task_memo, :expect_minute)
  end

  def task_params
    hash = {}
    task_params_permit.each do |key, value|
      case key
      when 'task_name'
        hash.store(:t_name, value)
      when 'task_label'
        hash.store(:label, value)
      when 'task_memo'
        hash.store(:memo, value)
      when 'expect_minute'
        hash.store(:expect_minute, value)
      end
    end
    hash
  end
end
