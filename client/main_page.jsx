import React from 'react';
import ReactDOM from 'react-dom';

// TaskSideコンポーネント
import MainPage from './components/MainPage';
// ボタンのイベント処理まとめ
import Buttons from './lib/buttons_events';

window.onload = () => {
  // buttonsにイベントを定義//
  document.getElementById('github').addEventListener('click', Buttons.github);
  // タスク追加ボタンのイベントを定義
  document.getElementById('append_task').addEventListener('click', Buttons.appendTask);

  // タスク一覧部分を描画
  ReactDOM.render(<MainPage />, document.querySelector('.main_container'));
};
