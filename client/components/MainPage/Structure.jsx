import React from 'react';

import StructureElement from './StructureElement';

class Structure extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Structure', props);
  }

  createElements(taskList, thisLabel) {
    // console.log('createElement in Structure:', taskList);
    const tasks = taskList.filter(task => (task.label === thisLabel));
    return tasks.map(task => (<StructureElement task={task} key={task.id} />));
  }

  render() {
    return (
      <div className="Structure">
        <p>{this.props.name}</p>
        <div className="StructureElements">
          {this.createElements(this.props.taskList, this.props.name)}
        </div>
      </div>
    );
  }
}

export default Structure;
