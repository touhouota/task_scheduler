import ReferencePage from './lib/reflection_page';

window.onload = () => {
  // グラフの初期化
  ReferencePage.init('graph');
  ReferencePage.getGraphData();
};
