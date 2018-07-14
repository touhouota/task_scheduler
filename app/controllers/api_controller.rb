class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  # 週を指定してタスクを取得(振りかえり利用)
  def week_reflection
    @user = User.find_by(user_id: params[:user_id])
    # 日付の範囲、今日までにすると今日の00:00までとなり、実質昨日までとなるので1日ずらす
    to = Date.parse(params[:date]) + 1
    from = to.ago(1.week)
    # 1週間分のタスクを返す
    conditions = {
      user_id: @user.user_id,
      updated_at: (from..to),
      status: [2, 3]
    }
    render json: Task.where(conditions)
  end
end
