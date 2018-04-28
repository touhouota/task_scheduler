import React from 'react';

import TaskList from './TaskList';
import Modal from './Modal';

import Base from '../lib/base_object';
import ModalProcess from '../lib/modal_process';

class TaskSide extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
    this.sendForm = this.sendForm.bind(this);
    this.getTask();
  }

  getTask() {
    fetch('/api/tasks')
      .then(response => response.json())
      .then((json) => {
        this.updateTaskList(json);
      });
  }

  updateTaskList(tasklist) {
    this.setState({
      tasks: tasklist,
    });
  }

  sendForm() {
    console.log('send form information');
    const formData = ModalProcess.getModalData();
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
      <div>
        <TaskList taskList={this.state.tasks} />
        <div className="after_plan">
          計画
        </div>
        <Modal reRender={this.sendForm} />
      </div>
    );
  }
}

export default TaskSide;
