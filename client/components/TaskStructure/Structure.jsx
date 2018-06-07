import React from 'react';

import StructureElement from './StructureElement';

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

  /*
   * 現在注目している階層のタスクを取得する
   */
  createStructureElements(tasks, labelMap) {
    console.log('createStructureElements labelMap:', labelMap);

    // 現在の見ているラベルを取得
    const nowLabel = this.props.Directory;
    // デフォルトは、すべてのラベル
    let labels = labelMap;
    if (nowLabel !== 'main') {
      /*
       * 今mainで無いとき、サブラベルを見に行く
       */
      const searchLabel = [];
      if (labels.has(nowLabel)) {
        // 今見ているラベルがあれば、そのサブリストを取得
        labels = labels.get(nowLabel).get('subLabel');
      } else {
        //
        while (!labels.has(nowLabel)) {
          /*
           * 一旦Labelの
           */
          // console.log('createStructureElements forEach1:', searchLabel);
          labels.forEach((Map, __) => {
            searchLabel.push(Map.get('subLabel'));
          });
          labels = searchLabel.shift();
          // console.log('createStructureElements forEach2:', searchLabel);
        }
      }
      // labels = labels.get('subLabel');
    } // if(!labels.has(nowLabel))
    const structureElements = [];

    // Labelにあうタスクを取得
    labels.forEach((content, label) => {
      // console.log('createStructureElements => forEach:', content, label);
      // 下位タスクのラベルを保持
      const labelFilter = [label];
      // サブラベルの中にあるサブラベルを保持
      let tmpLabel = content;
      const contents = [];
      // サブラベルのラベルと、さらにサブラベルを回していく
      while (tmpLabel.get('subLabel').size !== 0) {
        tmpLabel.get('subLabel').forEach((value, key) => {
          // 現在見ているラベルの下位ラベルを取得
          contents.push(value);
          labelFilter.push(key);
        });
        tmpLabel = contents.shift();
      }
      console.log(labelFilter);
      const taskList = tasks.filter(task => labelFilter.includes(task.label));

      structureElements.push(<StructureElement
        key={label}
        name={content.get('name')}
        label={label}
        labelList={labels}
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
        {this.createStructureElements(this.state.tasks, this.labelList)}
      </div>
    );
  }
}


export default Structure;
