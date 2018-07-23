require 'http'
require 'json'
require 'eventmachine'
require 'faye/websocket'

class SlackBot
  attr_accessor :task, :status
  def initialize
    @TOKEN = ENV['SLACK_API_TOKEN']
    @task = {}
    @status = 0
    # connect_RTM
  end

  def get_RTM_url
    response = HTTP.post('https://slack.com/api/rtm.start', params: {
                           token: @TOKEN
                         })
    rc = JSON.parse(response.body)
    rc['url']
  end

  def set_information(key, data)
    @task[key] = data
  end

  def reset_information
    @task = {}
    @status = 0
  end

  # タスクを修正するため
  def modify(old_value, new_value)
    @task.each do |key, value|
      if value["client_msg_id"] == old_value["client_msg_id"]
        @task[key] = new_value
        break
      end
    end
  end

  # キャンセルされたかを確認
  def check_cancel
    # TODO: キャンセル、と書かれたときに処理をリセットする
  end

  def connect_RTM
    url = get_RTM_url
  end
end

begin
  slack = SlackBot.new
  EM.run do

    # Web Socketインスタンスの立ち上げ
    ws = Faye::WebSocket::Client.new(slack.get_RTM_url)

    #  接続が確立した時の処理
    ws.on :open do
      p [:open]
    end

    # RTM APIから情報を受け取った時の処理
    ws.on :message do |event|
      # puts "status:#{slack.status}, task: #{slack.task}\n\n"
      data = JSON.parse(event.data)
      # p data

      # Slackにてコメントを修正されたときに、実行される
      if [1,2,3].include?(slack.status) && data['message']
        slack.modify(data['previous_message'], data['message'])
      end

      if data['text'].include?('ボタン') then
        ws.send({
          channel: data['channel'],
          type: 'message',
          attachments: [{
            text: "Choose a game to play",
            fallback: "You are unable to choose a game",
            callback_id: "wopr_game",
            color: "#3AA3E3",
            attachment_type: "default",
            actions: [
                {
                    name: "game",
                    text: "Chess",
                    type: "button",
                    value: "chess"
                },
                {
                    name: "game",
                    text: "Falken's Maze",
                    type: "button",
                    value: "maze"
                },
                {
                    name: "game",
                    text: "Thermonuclear War",
                    style: "danger",
                    type: "button",
                    value: "war",
                    confirm: {
                        title: "Are you sure?",
                        text: "Wouldn't you prefer a good game of chess?",
                        ok_text: "Yes",
                        dismiss_text: "No"
                    }
                }
            ]
        }],
          text: <<~EOS
          <@#{data['user']}>さん
          hoge
          EOS
        }.to_json)
      end

      # タスク追加時のフェーズ
      case slack.status
      when 0 then
        if data['text'] == 'タスク追加' && data['user']
          ws.send({
            channel: data['channel'],
            type: 'message',
            text: <<~EOS
            <@#{data['user']}>さん
            どんなタスク？
            EOS
          }.to_json)
          slack.status = 1
        end
      when 1 then
        if data['text'].nil?.! && data['user'] then
          # 前のコメントがタスクのはず
          slack.set_information(:t_name, data)
          ws.send({
            channel: data['channel'],
            type: 'message',
            text: <<~EOS
            <@#{data['user']}>さん
            何分位かかりそう？
            (数字のみを入力してね)
            EOS
          }.to_json)
          slack.status = 2
        end
      when 2 then
        if data['text'].nil?.! && data['user']
          minute = data['text'].to_i
          if minute.zero?
            ws.send({
              channel: data['channel'],
              type: 'message',
              text: <<~EOS
              <@#{data['user']}>さん
              時間は、1以上の数字で入力してくだし。
              EOS
            }.to_json)
          else
            # 前のコメントが時間のはず
            slack.set_information(:exp_minute, data)
            ws.send({
              channel: data['channel'],
              type: 'message',
              text: <<~EOS
              <@#{data['user']}>さん
              タスクに関して、なにかメモしておく？
              EOS
            }.to_json)
            slack.status = 3
          end
        end
      when 3 then
        if data['text'].nil?.! && data['user']
          slack.set_information(:memo, data)

          # p "追加", slack.task
          ws.send({
            channel: data['channel'],
            type: 'message',
            text: <<~EOS
            <@#{data['user']}>さん
            タスクを追加しました。
            ---------------
            タスク名：#{slack.task[:t_name]['text']}
            予想時間：#{slack.task[:exp_minute]['text']}分
            メモ：   #{slack.task[:memo]['text']}
            ---------------
            EOS
          }.to_json)
          slack.reset_information
        end
      end
    end

    # 接続が切断した時の処理
    ws.on :close do |event|
      p [:close, event.code]
      ws = nil
      EM.stop
    end
  end
rescue => e
  puts "error: なんかのエラーが起きた"
  puts "#{e.class} : #{e.message}"
end
