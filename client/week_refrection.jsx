import React from 'react';
import ReactDOM from 'react-dom';

import WeekReflection from './components/WeekReflection';

// import Base from './lib/base_object';

window.onload = () => {
  ReactDOM.render(
    <WeekReflection />,
    document.querySelector('.week_area'),
  );
};
