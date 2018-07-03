import React from 'react';

import WeekReflection from './week_reflection/WeekReflection';

const WeekReflectionContainer = () => (
  <div className="container">
    <header />
    <div className="WeekReflection">
      <WeekReflection
        TimerManager={this.props.TimerManager}
      />
    </div>
  </div>
);

export default WeekReflectionContainer;
