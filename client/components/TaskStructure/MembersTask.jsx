import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';

class MembersTask extends React.Component {
  constructor(props) {
    super(props);
    console.log('MembersTask');
    this.setState({
      members: [],
    });

    this.createMembersTaskNumList = this.createMembersTaskNumList.bind(this);
    this.getMembersTaskNumRequest = this.getMembersTaskNumRequest.bind(this);
    this.getMembersTaskNumRequest();
  }

  getMembersTaskNumRequest() {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    fetch(`${path}/api/tasks/membersTask`, {
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
    return this.props.members.map(member => (
      <li>
        {member.name}
      </li>
    ));
  }

  render() {
    return (
      <ul>
        {this.createMembersTaskNumList()}
      </ul>
    );
  }
}

MembersTask.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.string,
    name: PropTypes.string,
    task_num: PropTypes.number,
    finish_num: PropTypes.number,
  })).isRequired,
};

export default MembersTask;
