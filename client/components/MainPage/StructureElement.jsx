import React from 'react';

class StructureElement extends React.Component {
  constructor(props) {
    super(props);
    console.log('StructureElement', props);
  }

  render() {
    return (
      <div className="StructureElement" key={this.props.task.id}>
        <p className="StructureElementName">{this.props.task.t_name}</p>
        <p className="StructureElementMemo">{this.props.task.memo}</p>
      </div>
    );
  }
}

export default StructureElement;
