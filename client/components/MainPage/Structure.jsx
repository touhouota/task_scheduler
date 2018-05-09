import React from 'react';

import StructureElement from './StructureElement';

class Structure extends React.Component {
  constructor(props) {
    super(props);
    console.log('Structure', props);
  }

  createElements(taskList, thisLabel) {
    // タスク一覧から、このコンポーネントに置くべきものを選ぶ
    const tasks = taskList.filter(task => (task.label === thisLabel));
    // ここに表示するタスクをElementコンポーネントに変換する
    return tasks.map(task => (<StructureElement task={task} />));
  }

  render() {
    return (
      <div className="Structure">
        <p>{this.props.structureName}</p>
        <div className="StructureElements">
          {this.createElements(this.props.taskList, this.props.structureName)}
        </div>
      </div>
    );
  }
}

export default Structure;
