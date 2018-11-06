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

  def all_user_information
    users = get_all_user
    res = []
    users.each do |user|
      res.push(
        user_id: user[:user_id],
        task_info: tasks_per_label(user[:user_id]),
        achieve: get_achieve(user[:user_id]),
        actual_secs: total_actual_sec(user[:user_id])
      )
    end
    render json: res
  end

  # 全ユーザid
  def get_all_user
    User.all
  end

  # タスク数をラベルごとに取得
  def tasks_per_label(user_id)
    list = %w[survay develop experiment write]
    Task.where(user_id: user_id).group(:label).count.select do |label|
      list.include?(label)
    end
  end

  # 達成数
  def get_achieve(user_id)
    Task.where(user_id: user_id).group(:status).count
  end

  # 総作業時間
  def total_actual_sec(user_id)
    Task.where(user_id: user_id).sum(:actual_sec)
  end

  # メイン画面でのグラフ情報を取得する処理
  def get_my_info
    user_id = params[:user_id]
    render json: {
      task_info: tasks_per_label(user_id),
      total_actual_sec: total_actual_sec(user_id)
    }
  end

  # 自分に似たユーザ情報を取得する
  def get_like_user_info
    user_id = params[:user_id]
    # 全てのユーザの順位を取得(desc順)
    # [{user_id => 秒数}, {user_id => 秒数}, ...]という形で返ってくる
    list = Task.group(:user_id).sum(:actual_sec).sort_by do |_, v|
             # [user_id => 秒数]という形なので、-秒数でソートするとdesc順になる
             -v
           end.map do |array|
      # [user_id, 秒数]の形式で返ってくるので、hashに変換する
      Hash[*array.flatten]
    end
    # TODO: 同順の人を弾く処理

    # 自分のIDの順位を取得
    index = list.index { |hash| hash.key?(user_id) }
    # 最低限、末尾を見ないように調整
    # TODO: 自分が上位2位以上の場合の表示
    index = 2 if index - 2 < 0
    # 自分より上位の2人を表示
    render json: list.slice((index - 2), 2)
  end
end
