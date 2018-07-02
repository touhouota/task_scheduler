import React from 'react';

import WeekStructure from './week_reflection/WeekStructure';

import Base from '../lib/base_object';

class WeekReflection extends React.Component {
  constructor(props) {
    super(props);
    this.reGetDate = this.reGetDate.bind(this);

    const date = new Date();
    this.state = {
      date: Base.format_ymd(date),
    };
  }

  reGetDate(event) {
    console.log(event.currentTarget.value);
    this.setState({
      date: event.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="WeekReflection">
        <input
          type="date"
          value={this.state.date}
          onChange={this.reGetDate}
        />
        <WeekStructure
          TimerManager={this.props.TimerManager}
          targetDate={this.state.date}
        />
      </div>
    );
  }
}


export default WeekReflection;
