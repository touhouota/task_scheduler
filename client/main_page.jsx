import React from 'react';
import ReactDOM from 'react-dom';

// 基本的なおぶじぇくと
import Base from './lib/base_object';
// Modalコンポーネント
import Modal from './components/Modal';
// タスク部分のコンポーネント
import TaskList from './components/TaskList';
// 計画に関する処理まとめ
import Plan from './lib/main_page_plan';
// ボタンのイベント処理まとめ
import Buttons from './lib/buttons_events';

window.onload = function () {
  console.log(Base.get_cookie('user_id'));
  // 現在時刻に線を引く
  Plan.currentTimeLine();

  // buttonsにイベントを定義//
  document.getElementById('github').addEventListener('click', Buttons.github);
  // タスク追加ボタンのイベントを定義
  document.getElementById('append_task').addEventListener('click', Buttons.append_task);

  // タスク一覧部分を描画
  ReactDOM.render(<TaskList />, document.getElementById('task_list'));
  ReactDOM.render(<Modal />, document.getElementById('modal_area'));
};
