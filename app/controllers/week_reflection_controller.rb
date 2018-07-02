class WeekReflectionController < ApplicationController
  def index
    @user = User.find_by(user_id: params[:user_id])
  end
end
