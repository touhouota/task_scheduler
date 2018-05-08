class ApiController < ApplicationController
  # タスクの一覧を取得する
  def tasks
    @tasks = Task.all

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
      render json: Task.all
    else
      render json: @task.errors
    end
  end
end
