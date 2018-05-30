import React from 'react';

import StructureElement from './StructureElement';
import Modal from '../MainPage/Modal';

import Base from '../../lib/base_object';

const labels = {
  survay: '文献調査',
  develop: '提案実装',
  experiment: '実験・準備',
  write: '論文執筆',
  everyday: '普段のあれこれ',
};

class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.createStructureElements = this.createStructureElements.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);

    this.getTask();

    this.state = {
      tasks: [],
    };
  }

  getTask() {
    const formData = new FormData();
    const path = Base.get_path();
    fetch(`${path}/api/tasks/self`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
    })
      .then(response => response.json())
      .then((json) => {
        // this.updateTaskList(json);
        json.forEach((item) => {
          this.updateTaskList(item);
        });
      });
  }

  createStructureElements(tasks) {
    return Object.keys(labels).map((label) => {
      console.log('createStructureElements:', label);

      const taskList = tasks.filter(task => task.label === label);

      return (
        <StructureElement
          key={label}
          name={labels[label]}
          label={label}
          tasks={taskList}
          TimerManager={this.props.TimerManager}
          updateTaskList={this.updateTaskList}
        />
      );
    });
  }

  updateTaskList(taskData) {
    const taskList = this.state.tasks;
    // console.log('updateTaskList:', taskList);
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
      <div className="Structure">
        {this.createStructureElements(this.state.tasks)}
        <Modal
          updateTaskList={this.updateTaskList}
        />
      </div>
    );
  }
}

export default Structure;
