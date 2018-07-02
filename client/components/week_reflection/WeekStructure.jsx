import React from 'react';

// 継承するコンポーネント
import Structure from '../TaskStructure/Structure';
// 複製する曜日コンポーネント
import WeekStructElement from './WeekStructElement';

import Base from '../../lib/base_object';

class WeekStructure extends Structure {
  constructor(props) {
    super(props);

    // 各曜日の名前を指定
    // RubyのDateTime#wdayで曜日の番号が与えられる
    // 0: 日曜 ~ 6: 土曜
    this.weeks = [{
      label: 'sun',
      name: '日曜日',
    }, {
      label: 'mon',
      name: '月曜日',
    }, {
      label: 'tue',
      name: '火曜日',
    }, {
      label: 'wed',
      name: '水曜日',
    }, {
      label: 'thu',
      name: '木曜日',
    }, {
      label: 'fri',
      name: '金曜日',
    }, {
      label: 'sat',
      name: '土曜日',
    }];

    this.state = {
      tasks: [],
    };

    this.createStructureElements = this.createStructureElements.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);

    this.getTask();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (this.props.targetDate !== nextProps.targetDate) {
      this.getTask();
    }
  }

  createStructureElements(tasks) {
    const structureElements = [];

    // this.weeks.forEach((wdayObject, wdayNum) => {});

    const date = new Date(this.props.targetDate);
    let i = date.getDay() + 1; // 曜日 + 1でその要素が配列の最後に入る
    const fin = i + 7;
    let wdayNum;
    let wdayObject;
    for (i; i < fin; i += 1) {
      wdayNum = i % 7;
      console.log(wdayNum);
      // 合っている曜日をリスト化する
      const taskList = tasks.filter((task) => {
        const updatedAt = new Date(task.updated_at);
        return updatedAt.getDay() === (wdayNum % 7);
      });
      wdayObject = this.weeks[wdayNum];
      structureElements.push(<WeekStructElement
        key={wdayObject.label}
        name={wdayObject.name}
        label={wdayObject.label}
        tasks={taskList}
        TimerManager={this.props.TimerManager}
        updateTaskList={super.updateTaskList}
        setTaskInformation={super.setTaskInformation}
      />);
    }

    return structureElements;
  }

  updateTaskList(taskList) {
    this.setState({
      tasks: taskList,
    });
  }

  getTask() {
    console.log('WeekStructure');
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    // const date = new Date();
    fetch(`${path}/api/week/${this.props.targetDate}/${userId}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
    })
      .then(response => response.json())
      .then((json) => {
        this.updateTaskList(json);
      });
  }

  render() {
    return (
      <div className="WeekStructure">
        {this.createStructureElements(this.state.tasks)}
      </div>
    );
  }
}

export default WeekStructure;
