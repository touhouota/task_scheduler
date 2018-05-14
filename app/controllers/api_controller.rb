class ApiController < ApplicationController
  # タスクの一覧を取得する
  def tasks
    @tasks = Task.all

    render json: @tasks
  end

  # 特定のユーザ
  def user_tasks
    @tasks = Task.where(user_id: params[:user_id])
    puts "user_tasks: #{params[:user_id]}, #{@tasks.to_a}"
    render json: @tasks
  end

  def insert_task
    task_info = {
      user_id: params[:user_id],
      t_name: params[:task_name],
      memo: params[:task_memo],
      label: params[:task_label],
      expect_minute: params[:expect_minute]
    }
    user = User.find_by(user_id: params[:user_id])
    @task = user.tasks.build(task_info)
    puts "insert: #{@task}"
    if @task.save
      render json: @task
    else
      render json: @task.errors
    end
  end

  def statusChange
    @task = Task.find(params[:id])
    @task.status = params[:status]
    @task.save
    render json: @task
  end
end
