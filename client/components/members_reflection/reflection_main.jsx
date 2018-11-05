import React from 'react';

import User from './user';
import Base from '../../lib/base_object';

class ReflectionMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };

    this.createUserGraph = this.createUserGraph.bind(this);
    this.getMembersInfo = this.getMembersInfo.bind(this);
    this.reshapeList = this.reshapeList.bind(this);

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
        this.setState({ userList: json });
      });
  }

  createUserGraph() {
    const userGraph = [];
    const userList = this.reshapeList();
    console.log(userList);
    userList.forEach((userInfo) => {
      console.log(userInfo);
      userGraph.push(<User {...userInfo} />);
    });
    return userGraph;
  }

  // ユーザリストを、自分が先頭になるように調整
  reshapeList() {
    const userList = this.state.userList;
    // 自分のデータindexを取得
    const selfIndex = userList.findIndex((user) => {
      const userID = Base.get_cookie('user_id');
      console.log(userID, user.user_id);
      return userID === user.user_id;
    });
    const selfData = userList.splice(selfIndex, 1);
    return selfData.concat(userList);
  }


  render() {
    return (
      <div>
        {this.createUserGraph()}
      </div>
    );
  }
}

export default ReflectionMain;
