import React from 'react';

import WeekReflection from './week_reflection/WeekReflection';
import WeekHeader from './week_reflection/WeekHeader';

class WeekReflectionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateTaskList = this.updateTaskList.bind(this);
  }

  updateTaskList() {
    // TODO: stateでタスクリストをもたせ、更新するようにする
    // これより下のコンポーネントから引っ張ってくればいい
    // 合わせて、WeekReflectionへpropsで渡してくれればいいよ
  }

  render() {
    return (
      <div>
        <WeekHeader
          sum={0}
        />
        <div className="WeekReflection">
          <WeekReflection
            TimerManager={this.props.TimerManager}
          />
        </div>
      </div>
    );
  }
}

export default WeekReflectionContainer;
