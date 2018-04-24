import React from 'react';
import ReactDOM from 'react-dom';

// タスク部分のコンポーネント
import TaskList from './components/TaskList';
// 計画に関する処理まとめ
import Plan from './lib/main_page_plan';

window.onload = function () {
  Plan.currentTimeLine();
  ReactDOM.render(<TaskList />, document.getElementById('task_list'));
};
