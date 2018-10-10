const Graph = {
  // canvasのdomを保持
  canvas: null,
  // canvasの描画関連を司るcontextを保持
  context: null,
  init: (canvasId) => {
    Graph.canvas = document.getElementById(canvasId);
    Graph.context = Graph.canvas.getContext('2d');
  },
  hello: () => {
    console.log('Hello Graph');
  },
};

export default Graph;
