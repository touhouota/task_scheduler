class LoginController < ApplicationController
  # Array内のメソッドのみCSRF対策をしない
  protect_from_forgery expect: ['login']

  # ページを表示する
  def index; end

  # Ajaxからのlogin要求
  def login
    # params | cookie.user_idで受け取ればいい
    user_id = params[:user_id]
    @user = User.find_by(user_id: user_id)
    if @user
      render json: @user
    else
      render json: {
        u_name: 'ないよ'
      }
    end
  end
end
