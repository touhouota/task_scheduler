import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.taskData,
    };
    this.statusNo = [
      'タスク実行',
      '一時停止',
    ];
  }

  getStatusImagePath(status) {
    return `/image/${this.statusNo[status]}`;
  }

  // 見積もり時間があれば、それを置く
  displayExpectedTime() {
    if (this.state.task.expect_minute) {
      return (
        <p>
          時間見積り：{this.state.task.expect_minute}分
        </p>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="task_element">
        <button type="button">
          {this.statusNo[this.state.task.status]}
        </button>
        <p className="task_name">
          タスク名：{this.state.task.t_name}
        </p>
        {this.displayExpectedTime()}
        <p className="memo">
          メモ：{this.state.task.memo}
        </p>
      </div>);
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    actual_sec: PropTypes.number,
    created_at: PropTypes.string,
    deleted: PropTypes.number,
    expect_minute: PropTypes.number,
    id: PropTypes.number,
    label: PropTypes.string,
    memo: PropTypes.string,
    name: PropTypes.string,
    reflection: PropTypes.string,
    status: PropTypes.number,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  }).isRequired,
};


export default Task;
