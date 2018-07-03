import React from 'react';

// 継承元の要素
import StructureElement from '../TaskStructure/StructureElement';
// 複製するもととなるタスク要素
import WeekTask from './WeekTask';

class WeekStructElement extends StructureElement {
  constructor(props) {
    super(props);

    this.sortOrderByTaskStatus = this.sortOrderByTaskStatus.bind(this);
    this.createTaskElements = this.createTaskElements.bind(this);
  }

  sortOrderByTaskStatus(taskList) {
    return taskList.sort((item1, item2) => {
      /*
       * sortに関数を渡すと、その関数に従ってソートしてくれる
       * ここでは、statusが2 or 3のときは終わっているので下に移動してもらいたい
       * 引数の関数が負の値を返すときは、
       */
      if (item1.updated_at < item2.updated_at) {
        return -1;
      } else if (item2.updated_at < item1.updated_at) {
        return 1;
      }
      return 0;
    });
  }

  createTaskElements(tasks) {
    const taskList = this.sortOrderByTaskStatus(tasks);
    return taskList.map(task => (
      <WeekTask
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
      <div className={`WeekStructureElement ${this.props.label}`}>
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

export default WeekStructElement;
