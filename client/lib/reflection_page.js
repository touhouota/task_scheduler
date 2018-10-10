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
        ReflectionPage.__setLabelValue(json.task_info);
      });
  },
  __drawGraph: (tasks) => {
    Graph.setValue(tasks);
    Graph.draw();
  },
  __setLabelValue: (labels) => {
    console.table(json);
  },
};

export default ReflectionPage;
