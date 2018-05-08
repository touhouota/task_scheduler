import React from 'react';
// import PropTypes from 'prop-types';

import Structure from './Structure';

class OutlineSide extends React.Component {
  render() {
    return (
      <div className="OutlineSide">
        <p>研究の進捗</p>
        <Structure structureName="テーマ探し" />
        <Structure structureName="関連研究" />
      </div>
    );
  }
}

export default OutlineSide;
