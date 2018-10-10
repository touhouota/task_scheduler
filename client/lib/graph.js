import Base from './base_object';

const Graph = {
  // canvasのdomを保持
  canvas: null,
  // canvasの描画関連を司るcontextを保持
  context: null,
  // グラフを描画するための値を保持
  values: {},
  init: (canvasId) => {
    Graph.canvas = document.getElementById(canvasId);
    Graph.context = Graph.canvas.getContext('2d');
    Graph.setInitialCanvasSize();
    // Graph.test();
  },
  // 画面剤ずに合わせて、Canvasの大きさを初期化する
  setInitialCanvasSize: () => {
    const canvas = Graph.canvas;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.setAttribute('width', width.toString());
    canvas.setAttribute('height', height.toString());
  },
  // 描画するための値をセットする
  setValue: (hash) => {
    Graph.values = hash;
  },
  // グラフを描画
  draw: (labelList) => {
    const canvas = Graph.canvas;
    const ctx = Graph.context;
    // canvasの大きさ
    const width = canvas.width;
    const height = canvas.height;

    // 要素1つあたりの横幅スケールを指定
    const widthScale = Graph.__getScale();
    // グラフの高さのスケール
    const heigthScale = 0.9;

    // 描画する要素を取得
    const values = Graph.values;
    // 要素数を保持
    const valuesNum = Object.values(values).length;
    const keys = Object.keys(values);

    // グラフの色幅
    const colorRange = 360 / valuesNum;

    // グラフの縦幅を指定
    const barHeight = height * heigthScale;
    // グラフ描画の初期の高さ(グラフの高さの残りを上下に分けるため2で割る)
    const barStartHeight = (height * Base.round_at(1 - heigthScale, 1)) / 2;
    // グラフの横幅を保持(描画の一時変数)

    let barWidth = 0;

    labelList.forEach((label, index) => {
      ctx.fillStyle = `hsl(${colorRange * index}, 100%, 60%)`;
      ctx.fillRect(barWidth, barStartHeight, values[label] * widthScale, barHeight);
      barWidth += values[label] * widthScale;
    });
    // console.table({
    //   width,
    //   height,
    //   widthScale,
    //   heigthScale,
    //   values,
    //   valuesNum,
    //   colorRange,
    //   barHeight,
    //   barStartHeight,
    // });
  },
  test: () => {
    console.log('Hello Graph');
    console.log(Graph.canvas);
    console.log(Graph.context);
    Graph.context.moveTo(10, 10);
    Graph.context.lineTo(90, 90);
    Graph.context.stroke();
    Graph.setValue({
      a: 10,
      b: 20,
    });
    console.log(Graph.__getScale());
    Graph.draw();
  },
  // 以下、内部だけで使う関数たち
  __getScale: () => {
    const values = Object.values(Graph.values);
    let sum = 0;
    values.forEach((num) => {
      sum += num;
    });
    return Graph.canvas.width / sum;
  },
};

export default Graph;
