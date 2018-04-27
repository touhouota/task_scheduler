import React from 'react';
import ReactDOM from 'react-dom';

// タスク部分のコンポーネント
import TaskList from './components/TaskList';
// 計画に関する処理まとめ
import Plan from './lib/main_page_plan';
// ボタンのイベント処理まとめ
import Buttons from './lib/buttons_events';

window.onload = function () {
  // 現在時刻に線を引く
  Plan.currentTimeLine();

  // buttonsにイベントを定義//
  document.getElementById('github').addEventListener('click', Buttons.github);
  // タスク追加ボタンのイベントを定義
  document.getElementById('append_task').addEventListener('click', Buttons.append_task);

  // タスク一覧部分を描画
  ReactDOM.render(<TaskList />, document.getElementById('task_list'));
};
