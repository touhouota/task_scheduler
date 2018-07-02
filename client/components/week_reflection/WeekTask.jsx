import React from 'react';

import Task from '../TaskStructure/Task';

import Base from '../../lib/base_object';

class WeekTask extends Task {
  constructor(props) {
    super(props);
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
            {super.displayActualTime()}経過
            {super.displayExpectMinute()}
          </div>
        </div>

        {/* タスクの詳細置き場 */}
        <TaskDetails
          taskData={this.props.taskData}
          TimerManager={this.TimerManager}
        />
      </div>
    );
  }
}

export default WeekTask;
