import React from 'react';
// import PropTypes from 'prop-types';

import Structure from './Structure';

class OutlineSide extends React.Component {
  constructor(props) {
    super(props);
    console.log('OutlineSide:', props.taskList);
  }

  render() {
    return (
      <div className="OutlineSide">
        <p>研究の進捗</p>
        <Structure
          structureName="テーマ探し"
          taskList={this.props.taskList}
        />
        <Structure
          structureName="関連研究"
          taskList={this.props.taskList}
        />
      </div>
    );
  }
}

export default OutlineSide;
