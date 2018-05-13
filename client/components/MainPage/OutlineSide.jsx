import React from 'react';
// import PropTypes from 'prop-types';

import Structure from './Structure';

class OutlineSide extends React.Component {
  constructor(props) {
    super(props);
    console.log('OutlineSide:', props.taskList);
    this.labelOrder = [
      'thema',
      'survay',
      'develop',
      'experiment',
      'write',
      'everyday',
    ];
  }

  filterLabel() {
    const labels = this.props.taskList.map(task => task.label);
    console.table(labels);
    return Array.from(new Set(labels));
  }

  createElements() {
    // const labels = this.filterLabel();
    return this.labelOrder.map(label => (
      <Structure name={label} taskList={this.props.taskList} key={label} />
    ));
  }

  render() {
    return (
      <div className="OutlineSide">
        <p>研究の進捗</p>
        {this.createElements()}
      </div>
    );
  }
}

export default OutlineSide;
