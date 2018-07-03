import React from 'react';
import ReactDOM from 'react-dom';

import WeekReflectionContainer from './components/WeekReflectionContainer';

import TimerManager from './lib/time_manager';

// import Base from './lib/base_object';

window.onload = () => {
  console.log('week_reflection');
  ReactDOM.render(
    <WeekReflectionContainer
      TimerManager={TimerManager}
    />,
    document.body,
  );
};
