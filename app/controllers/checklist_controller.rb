require 'http'

class ChecklistController < ApplicationController
  # indexメソッドのみ、CSRF対策
  protect_from_forgery only: ['index']

  def index
    # ログを記録する
    tl_insert
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

  def create_message(box_name = 'hoge_fuga', user_id)
    user = User.find_by(user_id: user_id)
    label = box_name.split('_').first
    report_checklist = {
      title: 'タイトル(日・英)',
      abstj: 'アブストラクト(日本語)',
      abste: 'アブストラクト(英語)',
      intro: '導入・はじめに',
      scholar: '関連研究',
      product: '制作物・システム',
      exp: '方法・実験',
      result: '結果',
      consider: '考察',
      concl: 'まとめ・結論',
      thanks: '謝辞',
      ref: '参考文献',
      appendix: '付録',
      define: '言葉の定義',
      connect: '文の接続',
      struct: '各章のはじめ'
    }

    puts user[:u_name], label, report_checklist

    "#{user[:u_name]}さんは「#{report_checklist[label.to_sym]}」の項目にチェックを付けました"
  end
end
