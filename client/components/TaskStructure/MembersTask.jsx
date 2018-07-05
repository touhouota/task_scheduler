import React from 'react';

import Base from '../../lib/base_object';

class MembersTask extends React.Component {
  constructor(props) {
    super(props);
    console.log('MembersTask');
    this.state = {
      members: [],
    };

    this.createMembersTaskNumList = this.createMembersTaskNumList.bind(this);
    this.getMembersTaskNumRequest = this.getMembersTaskNumRequest.bind(this);
    this.setMembersStatusTimer = this.setMembersStatusTimer.bind(this);
    this.resetMembersStatusTimer = this.resetMembersStatusTimer.bind(this);
    this.getMembersTaskNumRequest();
    this.timer = this.setMembersStatusTimer();
  }

  // 仲間のタスク実行状況を取得する関数
  getMembersTaskNumRequest() {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    fetch(`${path}/api/tasks/membersTask/${userId}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
    })
      .then(response => response.json())
      .then((json) => {
        this.setState({
          members: json,
        });
      });
  }

  /**
   * 仲間の様子を定期的に取得するタイマーをセットし、タイマーIDを返す
   */
  setMembersStatusTimer() {
    return setInterval(this.getMembersTaskNumRequest, 1000 * 60);
  }

  /**
   * 手動で仲間の様子を取得する
   */
  resetMembersStatusTimer() {
    clearInterval(this.timer);
    this.getMembersTaskNumRequest();
    this.timer = this.setMembersStatusTimer();
  }

  /*
   * 各ユーザのタスク達成状況を計算
   */
  createMembersTaskNumList() {
    const members = this.state.members.sort((item1, item2) => {
      let rate1;
      let rate2;
      if (item1.task_num > 0) {
        rate1 = item1.finish_num / item1.task_num;
      } else {
        rate1 = 0;
      }

      if (item2.task_num > 0) {
        rate2 = item2.finish_num / item2.task_num;
      } else {
        rate2 = 0;
      }
      // 割合が高い人 or タスク数が多い人順
      return rate2 - rate1 || item2.task_num - item1.task_num;
    });
    return members.map((member, index) => {
      const rate = Base.round_at(member.finish_num / member.task_num, 1) || 0;
      return (
        <tr key={member.user_id} className="member">
          <td className="index">{index + 1}</td>
          <td className={`user_name ${member.user_id}`}>{member.u_name}</td>
          <td className="finish_rate">
            {rate * 100}%
            <span className="task_num">({member.finish_num}/{member.task_num})</span>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="modal members_status hide">
        <h1 className="modal_title">作業達成率ランキング</h1>
        <p className="modal_subscribe">
          今日までの1週間、登録した作業をどのくらい終わらせているかランキング。
          <br />
          1分ごとに更新しています。
        </p>
        <table className="member_list">
          <thead>
            <tr key="root">
              <th className="index">\</th>
              <th className="user_name">名前</th>
              <th className="task_num">割合</th>
            </tr>
          </thead>
          <tbody>
            {this.createMembersTaskNumList()}
          </tbody>
        </table>

        <button
          type="button"
          className="button"
          onClick={this.resetMembersStatusTimer}
        >
          ランキング更新
        </button>
      </div>
    );
  }
}

export default MembersTask;
