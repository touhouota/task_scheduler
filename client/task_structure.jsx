import React from 'react';
import ReactDOM from 'react-dom';

import Structure from './components/TaskStructure/Structure';

import Buttons from './lib/buttons_events';

window.onload = () => {
  document.getElementById('append_task').addEventListener('click', Buttons.append_task);
  document.getElementById('github').addEventListener('click', Buttons.github);

  ReactDOM.render(
    <div className="Structure_Component">
      <Structure label="ラベル名" />
    </div>,
    document.querySelector('.structure_container'),
  );
};
