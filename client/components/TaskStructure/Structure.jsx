import React from 'react';

import StructureElement from './StructureElement';
import Modal from '../MainPage/Modal';

import Base from '../../lib/base_object';

// ラベルの名前と配置場所
const labelList = {
  // 調査関連
  survay: {
    place: 'survay',
    name: '文献調査',
    subLabel: {
      precedent: {
        place: 'survay',
        name: 'ツールの事例・参考',
        subLabel: {},
      },
      reinforce: {
        place: 'survay',
        name: '提案の補強',
        subLabel: {},
      },
      interest: {
        place: 'survay',
        name: '興味',
        subLabel: {},
      },
    },
  },

  // 実装関連
  develop: {
    place: 'develop',
    name: '提案実装',
    subLabel: {
      study: {
        place: 'develop',
        name: '技術の勉強・調査',
        subLabel: {},
      },
      specification: {
        place: 'develop',
        name: 'ツール設計',
        subLabel: {},
      },
      prototypes: {
        place: 'develop',
        name: 'プロトタイプ作成',
        subLabel: {},
      },
      implement: {
        place: 'develop',
        name: '本実装',
        subLabel: {},
      },
    },
  },


  // 実験関連
  experiment: {
    place: 'experiment',
    name: '実験・準備',
    subLabel: {
      gather: {
        place: 'experiment',
        name: '被験者集め',
        subLabel: {},
      },
      pilot_study: {
        place: 'experiment',
        name: '予備実験',
        subLabel: {},
      },
      production_test: {
        place: 'experiment',
        name: '本実験',
        subLabel: {},
      },
      analysis: {
        place: 'experiment',
        name: 'データ分析',
        subLabel: {},
      },
      graph: {
        place: 'experiment',
        name: 'グラフ作成',
        subLabel: {},
      },
    },
  },

  // 論文関連
  write: {
    place: 'write',
    name: '論文執筆',
    subLabel: {
      organization: {
        place: 'write',
        name: '構成決め',
        subLabel: {},
      },
      outline: {
        place: 'write',
        name: '内容の列挙',
        subLabel: {},
      },
      sentence: {
        place: '',
        name: '文章作成',
        subLabel: {},
      },
      revision: {
        place: 'write',
        name: 'レビュー・修正',
        subLabel: {},
      },
    },
  },

  everyday: {
    place: 'everyday',
    name: '普段のあれこれ',
    subLabel: {},
  },
};

class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.createStructureElements = this.createStructureElements.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);

    this.getTask();

    this.state = {
      tasks: [],
    };
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

  createStructureElements(tasks) {
    let labels;
    const path = window.location.pathname.split('/');
    // path[4]は現在見ている階層を表す
    // /b1013179/task_scheduler/structure/:directory/:user_id
    if (Object.keys(labelList).includes(path[4])) {
      labels = labelList[path[4]];
    } else {
      labels = labelList;
    }
    return Object.keys(labels).map((label) => {
      // labelに紐づくsubLabelのリストを取得
      const subLabels = Object.keys(labels[label].subLabel);
      // 今見ているlabelも追加
      subLabels.push(label);

      // label, subLabelを持つタスクを取得
      const taskList = tasks.filter(task => subLabels.includes(task.label));

      return (
        <StructureElement
          key={label}
          name={labels[label].name}
          label={label}
          tasks={taskList}
          TimerManager={this.props.TimerManager}
          updateTaskList={this.updateTaskList}
        />
      );
    });
  }

  updateTaskList(taskData) {
    const taskList = this.state.tasks;
    // console.log('updateTaskList:', taskList);
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
