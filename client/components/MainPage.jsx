import React from 'react';

import TaskSide from './MainPage/TaskSide';
import OutlineSide from './MainPage/OutlineSide';

import Base from '../lib/base_object';
import ModalProcess from '../lib/modal_process';

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.getTask();
    this.sendForm = this.sendForm.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);
  }

  getTask() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then((json) => {
        this.updateTaskList(json);
      });
  }

  updateTaskList(taskList) {
    console.table(taskList);
    this.setState({
      tasks: taskList,
    });
  }

  sendForm() {
    console.log('send form information');
    const form = document.getElementById('modal_area');
    const formData = ModalProcess.getModalData(form);
    console.log(formData);
    fetch('/api/tasks/create/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
      body: formData,
    })
      .then(response => response.json())
      .then((json) => {
        this.updateTaskList(json);
      });
    ModalProcess.close();
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
