class MainPageController < ApplicationController
  def index
    cookies[:user_id] = params[:user_id]
  end
end
