import React from 'react';

import StructureElement from './StructureElement';

const labels = {
  survay: '文献調査',
  develop: '提案実装',
  experiment: '実験・準備',
  write: '論文執筆',
  everyday: '普段のあれこれ',
};

class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.createStructureElements = this.createStructureElements.bind(this);
  }

  createStructureElements() {
    return Object.keys(labels).map((label) => {
      console.log(label);

      return (
        <StructureElement
          key={label}
          name={labels[label]}
          label={label}
        />
      );
    });
  }

  render() {
    return (
      <div className="Structure">
        {this.createStructureElements()}
      </div>
    );
  }
}

export default Structure;
