class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find_by(user_id: params[:user_id])
  end

  def edit
    @user = User.find_by(user_id: params[:user_id])
  end

  def update
    @user = User.find(params[:user_id])
    if @user.update(users_params)
      # render plain: params.inspect
      redirect_to users_path
    else
      render :edit
    end
  end

  private

  def users_params
    params.require(:user).permit(:name)
  end
end
