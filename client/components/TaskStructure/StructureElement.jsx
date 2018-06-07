import React from 'react';

import Task from './Task';
import Modal from './Modal';

import ModalProcess from '../../lib/modal_process';

class StructureElement extends React.Component {
  constructor(props) {
    super(props);
    // this.taskList = this.sortOrderByTaskStatus(props.tasks);
    console.log('structureElement', props);
  }

  /*
   * タスクの順番を指定する
   */
  sortOrderByTaskStatus(taskList) {
    return taskList.sort((item1, item2) => {
      /*
       * sortに関数を渡すと、その関数に従ってソートしてくれる
       * ここでは、statusが2 or 3のときは終わっているので下に移動してもらいたい
       * 引数の関数が負の値を返すときは、
       */
      if (item1.status === 2 || item1.status === 3) {
        return 1;
      } else if (item1.status === 0 || item1.status === 4) {
        return -1;
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
      />
    ));
  }

  render() {
    return (
      <div className={`StructureElement ${this.props.label}`}>
        <p>
          {this.props.name}
          <button onClick={() => ModalProcess.init(this.props.label)} >
            タスク追加
          </button>
        </p>
        <div className="tasks">
          {this.createTaskElements(this.props.tasks)}
        </div>
        <Modal
          updateTaskList={this.props.updateTaskList}
          labelList={this.props.labelList.get(this.props.label).get('subLabel')}
          label={this.props.label}
        />
      </div>
    );
  }
}

export default StructureElement;
