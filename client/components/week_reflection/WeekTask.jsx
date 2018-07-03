import React from 'react';

import Task from '../TaskStructure/Task';
import WeekTaskDetails from './WeekTaskDetail';

import Base from '../../lib/base_object';

class WeekTask extends Task {
  constructor(props) {
    super(props);
  }

  displayExpectMinute() {
    const expectMinute = this.props.taskData.expect_minute;
    return (
      <span className="expect_minute">
        (予定：{this.props.TimerManager.convert_hms_from_seconds(expectMinute * 60)})
      </span>
    );
  }

  render() {
    const path = Base.get_path();
    return (
      <div className="task_container">
        <div
          className="task_element"
          id={this.props.taskData.id}
          data-status={this.props.taskData.status}
          data-start_date={this.props.taskData.updated_at}
          data-progress={this.props.taskData.actual_sec}
          onClick={super.displayThisDetails}
        >
          <div className="task_top">
            <span className="task_name">
              {this.props.taskData.t_name}
            </span>
          </div>

          {/* 作業時間 */}
          <div className="times">
            <img
              className="icon timer_icon"
              src={`${path}/image/time.png`}
              alt="作業時間"
            />
            {super.displayActualTime()}
            {this.displayExpectMinute()}
          </div>

          <div className="icon_area">
            <div className="icon" />
          </div>
        </div>

        {/* タスクの詳細置き場 */}
        <WeekTaskDetails
          taskData={this.props.taskData}
          TimerManager={this.props.TimerManager}
          clickButtonEvent={this.clickButtonEvent}
          clickFinishButtonEvent={this.clickFinishButtonEvent}
          taskStart={this.taskStart}
        />
      </div>
    );
  }
}

export default WeekTask;
