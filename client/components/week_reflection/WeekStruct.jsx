import React from 'react';

// 継承するコンポーネント
import Structure from '../TaskStructure/Structure';
// 複製する曜日コンポーネント
import WeekStructElement from './WeekStructElement';

class WeekStruct extends Structure {
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

    this.createStructureElements = this.createStructureElements.bind(this);
  }

  createStructureElements(tasks) {
    const structureElements = [];

    this.weeks.forEach((wdayObject, wdayNum) => {
      // 合っている曜日をリスト化する
      const taskList = tasks.filter((task) => {
        const updatedAt = new Date(task.updated_at);
        return updatedAt.getDay() === wdayNum;
      });

      structureElements.push(<WeekStructElement
        key={wdayObject.label}
        name={wdayObject.name}
        label={wdayObject.label}
        tasks={taskList}
        TimerManager={this.props.TimerManager}
      />);
    });

    return structureElements;
  }

  render() {
    return (
      <div className="WeekStructure">
        {this.createStructureElements(this.state.tasks)}
      </div>
    );
  }
}

export default WeekStruct;
