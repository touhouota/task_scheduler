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
    return this.state.members.map(member => (
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
