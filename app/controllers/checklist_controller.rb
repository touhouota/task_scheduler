require 'http'

class ChecklistController < ApplicationController
  # index, shareメソッドのみ、CSRF対策
  protect_from_forgery only: ['index share']

  def index
    # ログを記録する
    tl_insert
  end

  def share
    tl_insert
    @share_total = total_checkitem
    @checkitem = report_checklist
  end

  def get_check_list
    user_id = checklist_permit[:user_id]
    list = Checklist.where(user_id: user_id).select(:user_id, :box_name)

    # ログを記録する
    tl_insert

    render json: list
  end

  def set_check_list
    user = User.find_by(user_id: checklist_permit[:user_id])
    checklist = user.checklist.where(box_name: checklist_permit[:box_name])
    result = nil
    if checklist.empty?
      # 要素が存在しない時、追加する
      result = {
        data: user.checklist.create(box_name: checklist_permit[:box_name]),
        status: 'create'
      }

      # Slackへ投稿する
      post_slack(checklist_permit[:box_name], checklist_permit[:user_id])
    else
      # 要素が存在する場合、削除する
      result = {
        data: checklist.first.destroy,
        status: 'destroy'
      }
    end

    # ログを記録する
    tl_insert

    render json: result
  end

  def get_check_num
    tl_insert

    list = Checklist.where(user_id: checklist_permit[:user_id])
    render json: list.each_with_object({}) do |item, hash|
      p hash, item
      query_key = item[:box_name].split('_').first
      if hash.key? query_key
        hash[query_key] += 1
      else
        hash[query_key] = 1
      end
    end
  end

  private

  def tl_insert
    insert_timeline(
      user_id: checklist_permit[:user_id],
      content: "#{params[:controller]}\##{params[:action]}",
      task_id: nil,
      auto: 1
    )
  end

  def checklist_permit
    puts "permit: #{params.permit(:user_id, :box_name)}"
    params.permit(:user_id, :box_name)
  end

  def post_slack(text = 'test_test', user_id)
    target = 'https://slack.com/api/chat.postMessage'
    body = {
      token: ENV['SLACK_API_TOKEN'],
      channel: '#gt-progress',
      text: create_message(text, user_id),
      as_user: true
    }
    HTTP.post(target, params: body)
  end

  # 各項目の総数を返す
  def total_checkitem
    {
      title: 2,
      abstj: 2,
      abste: 4,
      intro: 5,
      scholar: 2,
      product: 5,
      exp: 4,
      result: 4,
      consider: 4,
      concl: 2,
      thanks: 1,
      ref: 4,
      appendix: 3,
      define: 3,
      connect: 2,
      struct: 2
    }
  end

  # 各項目の名前を返す
  def report_checklist
    {
      title: 'タイトル(日・英)',
      abstj: '概要(日本語)',
      abste: '概要(英語)',
      intro: '導入',
      scholar: '関連研究',
      product: 'システム',
      exp: '方法・実験',
      result: '結果',
      consider: '考察',
      concl: '結論',
      thanks: '謝辞',
      ref: '参考文献',
      appendix: '付録',
      define: '言葉の定義',
      connect: '文の接続',
      struct: '各章のはじめ'
    }
  end

  def create_message(box_name = 'hoge_fuga', user_id)
    user = User.find_by(user_id: user_id)
    label = box_name.split('_').first
    "#{user[:u_name]}さんは「#{report_checklist[label.to_sym]}」の項目にチェックを付けました"
  end
end
