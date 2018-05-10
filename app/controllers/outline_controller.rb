class OutlineController < ApplicationController
  def index
    @tasks = Task.where(user_id: params[:user_id])
  end
end
