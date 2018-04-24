import React from 'react';

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


export default Task;
