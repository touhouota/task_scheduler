import React from 'react';

import User from './user';
import Base from '../../lib/base_object';

class ReflectionMain extends React.Component {
  constructor(props) {
    super(props);

    this.getMembersInfo = this.getMembersInfo.bind(this);

    this.getMembersInfo();
  }

  getMembersInfo() {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    fetch(`${path}/api/members/${userId}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      });
  }


  render() {
    return (
      <div>
        <User />
      </div>
    );
  }
}

export default ReflectionMain;
