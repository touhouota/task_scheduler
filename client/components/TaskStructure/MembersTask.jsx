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
    this.getMembersTaskNumRequest();
  }

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

      if (rate1 < rate2) {
        return 1;
      } else if (rate1 > rate2) {
        return -1;
      }
      return 0;
    });
    return members.map(member => (
      <li key={member.user_id} className="member">
        <span className={member.user_id}>{member.u_name}</span>:
        <span className="task_num">{member.finish_num}/{member.task_num}</span>
      </li>
    ));
  }

  render() {
    console.log(this.state);
    return (
      <div className="members_task">
        <ul>
          {this.createMembersTaskNumList()}
        </ul>
      </div>
    );
  }
}

export default MembersTask;