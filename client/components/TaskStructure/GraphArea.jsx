import React from 'react';

import MyGraph from './MyGraph';
import MembersGraph from './MembersGraph';

// import Base from '../../lib/base_object';


class GraphArea extends React.Component {
  constructor() {
    super();
    console.log('GraphArea');
  }

  render() {
    return (
      <div>
        <MyGraph />
        <MembersGraph />
      </div>
    );
  }
}

export default GraphArea;
