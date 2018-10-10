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
  __getGraphData: () => {
    const userId = Base.get_cookie('user_id');
    const path = `${Base.get_path()}/api/individual/${userId}`;
    fetch(path)
      .then(response => response.json())
      .then((json) => {
        // グラフ表示
        ReflectionPage.__drawGraph(json.task_info);
        // グラフのラベル付け
        ReflectionPage.__calcRate(json.task_info);
      });
  },
  __drawGraph: (tasks) => {
    Graph.setValue(tasks);
    Graph.draw();
  },
  __calcRate: (labels) => {
    const labelList = ['survay', 'develop', 'experiment', 'write'];
    let maxNum = 0;
    Object.values(labels).forEach((item) => {
      maxNum += item;
    });
    labelList.forEach((label) => {
      const rate = Base.round_at(labels[label] / maxNum, 1) * 100;
      ReflectionPage.__setLabelValue(label, rate);
    });
  },
  __setLabelValue: (label, rate) => {
    console.log(label, rate);
    const target = document.getElementById(label);
    target.querySelector('.value').textContent = rate.toString();
  },
};

export default ReflectionPage;
