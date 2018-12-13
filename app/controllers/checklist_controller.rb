class ChecklistController < ApplicationController
  def index
    render text: Dir.pwd
  end
end
