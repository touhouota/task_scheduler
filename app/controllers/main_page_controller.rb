class MainPageController < ApplicationController
  def index
    cookies[:user_id] = 'g2117034'
  end
end
