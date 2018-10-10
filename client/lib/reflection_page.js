import Graph from './graph';
import Base from './base_object';

const ReflectionPage = {
  init: (canvasId) => {
    Graph.init(canvasId);
  },
  drawGraph: (tasks) => {
    Graph.setValue(tasks);
    Graph.draw();
  },
  getGraphData: () => {
    const userId = Base.get_cookie('user_id');
    const path = `${Base.get_path()}/api/individual/${userId}`;
    fetch(path)
      .then(response => response.json())
      .then((json) => {
        console.table(json);
        ReflectionPage.drawGraph(json.task_info);
      });
  },
};

export default ReflectionPage;
