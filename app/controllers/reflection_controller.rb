class ReflectionController < ApplicationController
  def index; end

  # 振り返りページからのリクエストを処理
  def graph_data
    user_id = params[:user_id]
    render json: {
      task_info: tasks_per_label(user_id),
      achieve: get_achieve(user_id),
      actual_secs: total_actual_sec(user_id)
    }
  end

  # タスク数をラベルごとに取得
  def tasks_per_label(user_id)
    list = %w[survay develop experiment write]
    Task.where(user_id: user_id).group(:label).count.select do |row|
      list.include?(row[:label])
    end
  end

  # 達成数
  def get_achieve(user_id)
    Task.where(user_id: user_id).group(:status).count
  end

  def total_actual_sec(user_id)
    Task.where(user_id: user_id).sum(:actual_sec)
  end
end
