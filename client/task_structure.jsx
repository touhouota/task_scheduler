import React from 'react';
import ReactDOM from 'react-dom';

import Structure from './components/TaskStructure/Structure';

import Buttons from './lib/buttons_events';
import TimerManager from './lib/time_manager';

window.onload = () => {
  document.getElementById('append_task').addEventListener('click', Buttons.append_task);
  document.getElementById('github').addEventListener('click', Buttons.github);
  TimerManager.watch();

  ReactDOM.render(
    <div className="Structure_Component">
      <Structure
        TimerManager={TimerManager}
      />
    </div>,
    document.querySelector('.structure_container'),
  );
};
