import React from 'react';

import StructureElement from './StructureElement';
import Modal from '../MainPage/Modal';

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

  updateTaskList(taskData) {
    this.setState({
      tasks: taskData,
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
