class ApplicationController < ActionController::Base
  after_action :check_user

  def check_user
    puts "after_action: #{params}"
  end
end
