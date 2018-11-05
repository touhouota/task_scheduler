import React from 'react';
import PropTypes from 'prop-types';

import Graph from '../../lib/graph';

class GraphComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log('GraphComponent');
  }

  // コンポーネントを描画終わった後に実行する処理
  // Canvas関連の処理は病が終わらんとできないのでここに置く
  componentDidMount() {
    console.log('DidMount');
    Graph.init(this.props.canvasId);
    Graph.setValue(this.props.task_info);
    Graph.setLabel(['survay', 'develop', 'experiment', 'write']);
    Graph.draw();
  }


  render() {
    return (
      <canvas id={this.props.canvasId || 'canvas'} />
    );
  }
}

GraphComponent.propTypes = {
  canvasId: PropTypes.string.isRequired,
  task_info: PropTypes.shape({
    develop: PropTypes.number,
    experiment: PropTypes.number,
    survay: PropTypes.number,
    write: PropTypes.number,
  }).isRequired,
};

export default GraphComponent;
