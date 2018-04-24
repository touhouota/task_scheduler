import React from 'react';

import Task from './Task';


class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.getTask();
  }

  getTask() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          tasks: json,
        });
      });
  }

  render() {
    const tasks = this.state.tasks.map(task => <Task taskData={task} key={task.id} />);
    return (
      <div className="task_container">
        <p>タスク一覧</p>
        <div className="tasks">
          {tasks}
        </div>
      </div>
    );
  }
}

export default TaskList;
