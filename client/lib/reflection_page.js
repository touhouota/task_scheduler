import Graph from './graph';
import Base from './base_object';

const ReflectionPage = {
  // ページを描画する
  drawPage: (canvasId) => {
    // グラフの初期化
    ReflectionPage.__init(canvasId);
    ReflectionPage.__getGraphData();
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
      });
  },
  __drawGraph: (tasks) => {
    Graph.setValue(tasks);
    Graph.draw();
  },
  __setLabelValue: (labels) => {
    let maxNum = 0;
    Object.values(labels).forEach((item) => {
      maxNum += item;
    });
    const labelList = ['survay', 'develop', 'experiment', 'write'];
    labelList.forEach((label) => {
      const rate = Base.round_at(labels[label] / maxNum, 1) * 100;
      const target = document.getElementById(label);
      target.querySelector('.value').textContent = rate;
    });
  },
  __setAchiveRate: (achieve) => {
    let maxNum = 0;
    Object.values(achieve).forEach((num) => {
      maxNum += num;
    });
    const rate = Base.round_at(achieve[2] / maxNum, 1) * 100;
    const target = document.getElementById('achieve');
    target.querySelector('.value').textContent = rate;
  },
};

export default ReflectionPage;
