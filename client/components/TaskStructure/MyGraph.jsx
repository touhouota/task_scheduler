import React from 'react';

import GraphComponent from './GraphComponent';

class MyGraph extends React.Component {
  constructor() {
    super();
    console.log('MyGraph');
  }

  getMyData() {
    // TODO: 自分のデータを取得する
  }

  render() {
    return (
      <div className="myarea">
        <GraphComponent canvasId="myGraph" />
        <p className="label">総作業数　：<span id="total_task">hoge</span></p>
        <p className="label">総作業時間：<span id="total_time">hoge</span></p>
      </div>
    );
  }
}

export default MyGraph;
