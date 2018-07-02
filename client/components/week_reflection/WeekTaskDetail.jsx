import React from 'react';

import Base from '../../lib/base_object';

import TaskDetails from '../TaskStructure/TaskDetails';

class WeekTaskDetails extends TaskDetails {
  constructor(props) {
    super(props);
  }

  render() {
    const path = Base.get_path();
    return (
      <div
        className="task_detail hide"
        data-status={this.props.taskData.status}
        data-start_date={this.props.taskData.updated_at}
        data-progress={this.props.taskData.actual_sec}
      >
        <div className="task_top">
          <span className="task_name">
            {this.props.taskData.t_name}
          </span>
        </div>

        {/* 作業時間 */}
        <div className="times">
              作業時間：
          <span className="actual_sec">
            {this.props.TimerManager.convert_hms_from_seconds(this.props.taskData.actual_sec)}
                経過
          </span>
          <span className="expect_minute">
                (
            {this.props.TimerManager.convert_hms_from_seconds(this.props.taskData.expect_minute * 60)})
          </span>
        </div>

        {/* タスクのメモ */}
        <div className="memo">
              内容・メモ
          <p className="memo_text">
            {this.props.taskData.memo}
          </p>
        </div>

        <div className="icon_area">
          <div className="icon" />
        </div>
      </div>
    );
  }
}

export default WeekTaskDetails;
