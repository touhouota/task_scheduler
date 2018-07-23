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

  def check_label(text)
    [
      {name: '文献調査', label: 'survay'},
      {name: '提案実装', label: 'develop'},
      {name: '評価実験', label: 'experiment'},
      {name: '論文執筆', label: 'write'},
      {name: '普段のあれこれ', label: 'everyday'}
    ].find{|hash| hash[:name] == text}
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
      if [1,2,3,4].include?(slack.status) && data['message']
        slack.modify(data['previous_message'], data['message'])
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
          # タスク名を設定
          slack.set_information(:t_name, data)

          ws.send({
            channel: data['channel'],
            type: 'message',
            text: <<~EOS
            <@#{data['user']}>さん
            タスクのラベルは？
            1: 文献調査
            2: 提案実装
            3: 評価実験
            4: 論文執筆
            5: 普段のあれこれ
            EOS
          }.to_json)
          slack.status = 2
        end
      when 2 then
        if data['text'].nil?.! && data['user'] then
          if slack.exist_label?(data['text']) then
            # labelが正確ならば、セットして次の情報を通知
            slack.set_information(:label, data)

            ws.send({
              channel: data['channel'],
              type: 'message',
              text: <<~EOS
              <@#{data['user']}>さん
              何分位かかりそう？
              (数字のみを入力してね)
              EOS
            }.to_json)
            slack.status = 3
          else
            # labelが違うとき
            ws.send({
              channel: data['channel'],
              type: 'message',
              text: <<~EOS
              <@#{data['user']}>さん
              ラベルは、以下のものから選んで入力してください。
              1: 文献調査
              2: 提案実装
              3: 評価実験
              4: 論文執筆
              5: 普段のあれこれ

              // できればボタンで入力したいよね・・・・
              EOS
            }.to_json)
          end
        end
      when 3 then
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
            slack.status = 4
          end
        end
      when 4 then
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
            ラベル　：#{slack.get_label(slack.task[:exp_minute]['text'])}
            予想時間：#{slack.task[:label]['text']}分
            メモ　　：#{slack.task[:memo]['text']}
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
