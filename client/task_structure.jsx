import React from 'react';
import ReactDOM from 'react-dom';

import Structure from './components/TaskStructure/Structure';

window.onload = () => {
  ReactDOM.render(
    <div className="structure_container">
      hello TaskStructure
      <Structure label="ラベル名" />
    </div>,
    document.querySelector('.container'),
  );
};
