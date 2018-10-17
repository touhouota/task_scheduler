import React from 'react';
import PropTypes from 'prop-types';

import Graph from '../../lib/graph';

class User extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      task_info: props.task_info,
    };
  }

  componentDidMount() {
    console.log('DidMount');
    Graph.init(this.props.user_id);
    Graph.setValue(this.props.task_info);
    Graph.setLabel(['survay', 'develop', 'experiment', 'write']);
    Graph.draw();
  }


  render() {
    return (
      <div>
        <p>{this.props.user_id}</p>
        <canvas id={this.props.user_id} className="graph" />
      </div>
    );
  }
}

User.propTypes = {
  user_id: PropTypes.string.isRequired,
  achieve: PropTypes.shape({
    0: PropTypes.number,
    1: PropTypes.number,
    2: PropTypes.number,
    3: PropTypes.number,
    4: PropTypes.number,
  }).isRequired,
  actual_secs: PropTypes.number.isRequired,
  task_info: PropTypes.shape({
    develop: PropTypes.number,
    experiment: PropTypes.number,
    survay: PropTypes.number,
    write: PropTypes.number,
  }).isRequired,
};

export default User;
