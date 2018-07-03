import React from 'react';

import WeekStructure from './WeekStructure';

import Base from '../../lib/base_object';

class WeekReflection extends React.Component {
  constructor(props) {
    super(props);
    this.reGetDate = this.reGetDate.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);

    const date = new Date();
    this.state = {
      date: Base.format_ymd(date),
      tasks: [],
    };
  }

  reGetDate(event) {
    console.log(event.currentTarget.value);
    this.setState({
      date: event.currentTarget.value,
    });
  }

  updateTaskList(taskList) {
    this.setState({
      tasks: taskList,
    });
  }

  render() {
    return (
      <div className="WeekReflection">
        <input
          type="date"
          value={this.state.date}
          onChange={this.reGetDate}
        />までの1週間の様子
        <WeekStructure
          TimerManager={this.props.TimerManager}
          targetDate={this.state.date}
          tasks={this.state.tasks}
          updateTaskList={this.updateTaskList}
        />
      </div>
    );
  }
}


export default WeekReflection;
