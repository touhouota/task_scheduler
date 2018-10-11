import Graph from './graph';
import Base from './base_object';

const ReflectionPage = {
  // ページを描画する
  drawPage: (canvasId) => {
    // グラフの初期化
    ReflectionPage.__init(canvasId);
    ReflectionPage.__getGraphData();
  },
  // ページの再描画
  redraw: () => {
    console.log('redraw');
    if (!Graph.values) {
      ReflectionPage.__getGraphData();
    }
    ReflectionPage.__drawGraph();
  },
  // Canvasの初期化
  __init: (canvasId) => {
    Graph.init(canvasId);
  },
  // サーバからデータを取得
  __getGraphData: () => {
    const userId = Base.get_cookie('user_id');
    const path = `${Base.get_path()}/api/individual/${userId}`;
    fetch(path)
      .then(response => response.json())
      .then((json) => {
        // グラフ表示
        ReflectionPage.__drawGraph(json.task_info);
        // グラフのラベルごとの割合を計算・表示
        ReflectionPage.__setLabelValue(json.task_info);
        // タスクの達成率を計算・表示
        ReflectionPage.__setAchiveRate(json.achieve);
        // 総作業時間を計算・表示
        ReflectionPage.__setTotalActualTime(json.actual_secs);
      });
  },
  __drawGraph: (tasks) => {
    Graph.setValue(tasks);
    const labelList = ['survay', 'develop', 'experiment', 'write'];
    Graph.draw(labelList);
  },
  __setLabelValue: (labels) => {
    let maxNum = 0;
    Object.values(labels).forEach((item) => {
      maxNum += item;
    });
    const labelList = ['survay', 'develop', 'experiment', 'write'];
    labelList.forEach((label) => {
      let rate = Base.round_at((labels[label] / maxNum) * 100, 1);
      console.log(rate);
      if (Number.isNaN(rate)) {
        rate = 0;
      }
      const target = document.getElementById(label);
      target.querySelector('.value').textContent = rate;
    });
  },
  __setAchiveRate: (achieve) => {
    let maxNum = 0;
    Object.values(achieve).forEach((num) => {
      maxNum += num;
    });
    const rate = Base.round_at((achieve[2] / maxNum) * 100, 1);
    const target = document.getElementById('achieve');
    target.querySelector('.value').textContent = rate;
  },
  __setTotalActualTime: (sec) => {
    let min = Math.round(sec / 60);
    let hour = Math.round(min / 60);
    min -= hour * 60;
    const day = Math.round(hour / 24);
    hour -= day * 24;

    let displayString = `${min}分`;
    if (hour > 0) {
      displayString = `${hour}時間 ${displayString}`;
    }
    if (day > 0) {
      displayString = `${day}日 ${displayString}`;
    }

    const target = document.getElementById('work_time');
    target.querySelector('.value').textContent = displayString;
  },
};

export default ReflectionPage;
