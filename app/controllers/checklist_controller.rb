class ChecklistController < ApplicationController
  # indexメソッドのみ、CSRF対策
  protect_from_forgery only: ['index']

  def index
    # ログを記録する
    tl_insert
  end

  def get_check_list
    user_id = checklist_permit[:user_id]
    list = Checklist.where(user_id: user_id).select(:user_id, :box_name)

    # ログを記録する
    tl_insert

    render json: list
  end

  def set_check_list
    user = User.find_by(user_id: checklist_permit[:user_id])
    checklist = user.checklist.where(box_name: checklist_permit[:box_name])
    result = nil
    if checklist.empty?
      # 要素が存在しない時、追加する
      result = {
        data: user.checklist.create(box_name: checklist_permit[:box_name]),
        status: 'create'
      }

    else
      result = {
        data: checklist.first.destroy,
        status: 'destroy'
      }
    end

    # ログを記録する
    tl_insert

    render json: result
  end

  private

  def tl_insert
    insert_timeline(
      user_id: checklist_permit[:user_id],
      content: "#{params[:controller]}\##{params[:action]}",
      task_id: nil,
      auto: 1
    )
  end

  def checklist_permit
    params.permit(:user_id, :box_name)
  end
end
