import React from 'react';

import GraphComponent from './GraphComponent';

class MembersGraph extends React.Component {
  constructor() {
    super();
    console.log('MembersGraph');
  }

  // 自分より少し上の人をもらう
  getUpperUsers() {
  // TODO: サーバへリクエストを投げる
  }

  render() {
    return (
      <div />
    );
  }
}

export default MembersGraph;
