import React from 'react';

import Task from './Task';

class StructureElement extends React.Component {
  constructor(props) {
    super(props);
    console.log('StructureElement');
  }

  createTaskElements(tasks) {
    return tasks.map(task => (
      <Task
        key={task.id}
        taskData={task}
        updateTaskList={() => { console.log('hoge'); }}
      />
    ));
  }

  render() {
    return (
      <div className={`StructureElement ${this.props.label}`}>
        <p>{this.props.name}</p>
        <div className="tasks">
          {this.createTaskElements(this.props.tasks)}
        </div>
      </div>
    );
  }
}

export default StructureElement;
