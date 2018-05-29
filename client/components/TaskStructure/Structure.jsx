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

  createStructureElements() {
    return Object.keys(labels).map((label) => {
      console.log(label);

      return (
        <StructureElement
          key={label}
          name={labels[label]}
          label={label}
        />
      );
    });
  }

  getTask() {
    const formData = new FormData();
    formData.append('user_id', Base.get_cookie('user_id'));
    const path = Base.get_path();
    fetch(`${path}/api/tasks/${Base.get_cookie('user_id')}`)
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
        {this.createStructureElements()}
        <Modal
          updateTaskList={this.updateTaskList}
        />
      </div>
    );
  }
}

export default Structure;
