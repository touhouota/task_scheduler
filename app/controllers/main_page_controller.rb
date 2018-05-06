class MainPageController < ApplicationController
  def index
    cookies[:user_id] = 'user1'
  end
end
