import React from 'react';
import ReactDOM from 'react-dom';

import WeekReflection from './components/WeekReflection';

import TimerManager from './lib/time_manager';

// import Base from './lib/base_object';

window.onload = () => {
  ReactDOM.render(
    <WeekReflection
      TimerManager={TimerManager}
    />,
    document.querySelector('.week_area'),
  );
};
