import React from 'react';

import StructureElement from './StructureElement';
import Modal from '../MainPage/Modal';

import Base from '../../lib/base_object';

class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.createStructureElements = this.createStructureElements.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);

    this.getTask();

    this.state = {
      tasks: [],
    };
    // 論文執筆に関する手順Map
    const ReportProcess = new Map()
      .set('organization', new Map()
        .set('name', '構成決め')
        .set('subLabel', new Map()))
      .set('outline', new Map()
        .set('name', 'アウトライン・草案')
        .set('subLabel', new Map()))
      .set('sentence', new Map()
        .set('name', '文章作成')
        .set('subLabel', new Map()))
      .set('revision', new Map()
        .set('name', 'レビュー・修正')
        .set('subLabel', new Map()));
    // 卒研の作業Map
    this.labelList = new Map()
      .set('survay', new Map()
        .set('name', '文献調査')
        .set('subLabel', new Map()
          .set('precedent', new Map()
            .set('name', 'ツールの事例・参考')
            .set('subLabel', new Map()))
          .set('reinforce', new Map()
            .set('name', '提案の補強')
            .set('subLabel', new Map()))
          .set('interest', new Map()
            .set('name', '興味')
            .set('subLabel', new Map()))))
      .set('develop', new Map()
        .set('name', '提案実装')
        .set('subLabel', new Map()
          .set('study', new Map()
            .set('name', '技術の勉強・調査')
            .set('subLabel', new Map()))
          .set('specification', new Map()
            .set('name', 'ツールの設計')
            .set('subLabel', new Map()))
          .set('prototypes', new Map()
            .set('name', 'プロトタイプ作成')
            .set('subLabel', new Map()))
          .set('implement', new Map()
            .set('name', '本実験')
            .set('subLabel', new Map()))))
      .set('experiment', new Map()
        .set('name', '評価実験')
        .set('subLabel', new Map()
          .set('gather', new Map()
            .set('name', '被験者集め')
            .set('subLabel', new Map()))
          .set('pilot_study', new Map()
            .set('name', '予備実験')
            .set('subLabel', new Map()))
          .set('production_test', new Map()
            .set('name', '本実験')
            .set('subLabel', new Map()))
          .set('analysis', new Map()
            .set('name', 'データ分析')
            .set('subLabel', new Map()))))
      .set('write', new Map()
        .set('name', '論文執筆')
        .set('subLabel', new Map()
          .set('theme_committee', new Map()
            .set('name', 'テーマ審査会')
            .set('subLabel', ReportProcess))
          .set('middle_report', new Map()
            .set('name', '中間発表')
            .set('subLabel', ReportProcess))
          .set('final_report', new Map()
            .set('name', '採集発表')
            .set('subLabel', ReportProcess))))
      .set('everyday', new Map()
        .set('name', '普段のあれこれ')
        .set('subLabel', new Map()));
  }

  getTask() {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    fetch(`${path}/api/tasks/${userId}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
    })
      .then(response => response.json())
      .then((json) => {
        // this.updateTaskList(json);
        json.forEach((item) => {
          this.updateTaskList(item);
        });
      });
  }

  updateTaskList(taskData) {
    const taskList = this.state.tasks;
    const index = taskList.findIndex(task => task.id === taskData.id);
    if (index !== -1) {
      taskList[index] = taskData;
    } else {
      taskList.push(taskData);
    }
    this.setState({
      tasks: taskList,
    });
  }

  createStructureElements(tasks) {
    const structureElements = [];
    this.labelList.forEach((taskMap, label) => {
      const taskList = tasks.filter(task => task.label === label);
      structureElements.push(<StructureElement
        key={label}
        name={taskMap.get('name')}
        label={label}
        tasks={taskList}
        TimerManager={this.props.TimerManager}
        updateTaskList={this.updateTaskList}
      />);
    });
    return structureElements;
  }

  render() {
    return (
      <div className="Structure">
        {this.createStructureElements(this.state.tasks)}
        <Modal
          updateTaskList={this.updateTaskList}
        />
      </div>
    );
  }
}

export default Structure;
