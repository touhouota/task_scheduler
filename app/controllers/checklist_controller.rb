class ChecklistController < ApplicationController
  # indexメソッドのみ、CSRF対策
  protect_from_forgery only: ['index']

  def index; end

  def get_check_list
    user_id = checklist_permit[:user_id]
    list = Checklist.where(user_id: user_id).select(:user_id, :box_name)

    render json: list
  end

  private

  def checklist_permit
    params.permit(:user_id, :box_name)
  end
end
