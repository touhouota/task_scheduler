class ApplicationController < ActionController::Base
  # TLを追加する
  def insert_timeline(json)
    puts "insert_timeline: #{json}, #{params}"
    # user_idがない場合は無視する
    return nil unless params[:user_id]

    timeline = Timeline.new(json)
    timeline.save
    puts "insert_timeline: #{json}"
  end
end
