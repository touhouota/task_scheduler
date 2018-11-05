import React from 'react';
import ReactDOM from 'react-dom';

import Structure from './components/TaskStructure/Structure';
import MembersTask from './components/TaskStructure/MembersTask';
import GraphArea from './components/TaskStructure/GraphArea';

import Buttons from './lib/buttons_events';
import TimerManager from './lib/time_manager';
import Base from './lib/base_object';

window.onload = () => {
  if (!Base.get_cookie('user_id')) {
    /*
     * IDが無いときの処理
     */
    console.log('cookieがないよ！/ ログインページへ =>');
    const path = Base.get_path();
    window.location.href = `${path}`;
  } else {
    /*
     * IDがあるときは、普通にreactのあれこれを描画
     */
    document.getElementById('append_task').addEventListener('click', Buttons.appendTask);
    document.getElementById('member_status').addEventListener('click', Buttons.members);
    document.getElementById('week_reflection').addEventListener('click', Buttons.reflection);
    document.getElementById('github').addEventListener('click', Buttons.github);
    TimerManager.watch();
    document.getElementById('logout').addEventListener('click', Buttons.logout);

    // メインのタスク一覧部分
    ReactDOM.render(
      <div className="Structure_Component">
        {/* タスクのリストコンポーネント */}
        <Structure
          TimerManager={TimerManager}
        />
        {/* 仲間のランキングコンポーネント */}
        <MembersTask />
      </div>,
      document.querySelector('.structure_container'),
    );

    // グラフ描画部分
    ReactDOM.render(
      <GraphArea />,
      document.querySelector('.graph_area'),
    );
  }
};
