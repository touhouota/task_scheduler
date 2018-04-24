class ApiController < ApplicationController
  # タスクの一覧を取得する
  def tasks
    @tasks = Task.all

    render json: @tasks
  end
end
