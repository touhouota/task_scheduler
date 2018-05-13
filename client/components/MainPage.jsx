import React from 'react';

import TaskSide from './MainPage/TaskSide';
import OutlineSide from './MainPage/OutlineSide';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.getTask();
    this.updateTaskList = this.updateTaskList.bind(this);
  }

  getTask() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then((json) => {
        // this.updateTaskList(json);
        json.forEach((item) => {
          this.updateTaskList(item);
        });
      });
  }

  updateTaskList(taskData) {
    const taskList = this.state.tasks;
    console.log('updateTaskList:', taskList);
    const index = taskList.findIndex(task => task.id === taskData.id);
    if (index !== -1) {
      taskList[index] = taskData;
    } else {
      taskList.push(taskData);
    }
    this.setState({
      tasks: taskList,
    });
  }

  render() {
    return (
      <div className="MainPage">
        <TaskSide
          taskList={this.state.tasks}
          sendForm={this.sendForm}
          updateTaskList={this.updateTaskList}
        />
        <OutlineSide taskList={this.state.tasks} />
      </div>
    );
  }
}

export default MainPage;
