import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.taskData,
    };
  }

  render() {
    return (
      <div className="task_element">
        <p className="task_name">
          タスク名：{this.state.task.name}
        </p>
        <p className="user">
          ユーザ：{this.state.task.user_id}
        </p>
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
