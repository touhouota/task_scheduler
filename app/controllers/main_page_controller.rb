class MainPageController < ApplicationController
  def index
    cookies[:user_id] = 'test1'
  end
end
