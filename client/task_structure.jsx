import React from 'react';
import ReactDOM from 'react-dom';

import Structure from './components/TaskStructure/Structure';

window.onload = () => {
  ReactDOM.render(
    <div className="Structure_Component">
      <Structure label="ラベル名" />
    </div>,
    document.querySelector('.structure_container'),
  );
};
