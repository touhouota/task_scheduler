import React from 'react';

import Task from './Task';

class StructureElement extends React.Component {
  constructor(props) {
    super(props);
    // console.log('structureElement', props);
    this.sortOrderByTaskStatus = this.sortOrderByTaskStatus.bind(this);
    this.createTaskElements = this.createTaskElements.bind(this);
  }

  /*
   * タスクの順番を指定する
   */
  sortOrderByTaskStatus(taskList) {
    // console.log('structureElement', this.props);
    return taskList.sort((item1, item2) => {
      /*
       * sortに関数を渡すと、その関数に従ってソートしてくれる
       * ここでは、statusが2 or 3のときは終わっているので下に移動してもらいたい
       * 引数の関数が負の値を返すときは、
       */
      if (item1.status === 2 || item1.status === 3) {
        return 1;
      }
      return 0;
    });
  }

  createTaskElements(tasks) {
    const taskList = this.sortOrderByTaskStatus(tasks);
    return taskList.map(task => (
      <Task
        key={task.id}
        taskData={task}
        updateTaskList={this.props.updateTaskList}
        TimerManager={this.props.TimerManager}
        setTaskInformation={this.props.setTaskInformation}
      />
    ));
  }

  render() {
    return (
      <div className={`StructureElement ${this.props.label}`}>
        <p>
          {this.props.name}
        </p>
        <div className="tasks">
          {this.createTaskElements(this.props.tasks)}
        </div>
      </div>
    );
  }
}

export default StructureElement;
