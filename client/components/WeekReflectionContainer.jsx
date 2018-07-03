import React from 'react';

import WeekReflection from './week_reflection/WeekReflection';

class WeekReflectionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <header />
        <div className="WeekReflection">
          <WeekReflection
            TimerManager={this.props.TimerManager}
          />
        </div>
      </div>
    );
  }
}

export default WeekReflectionContainer;
