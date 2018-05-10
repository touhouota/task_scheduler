import React from 'react';

class StructureElement extends React.Component {
  constructor(props) {
    super(props);
    this.status = [
      'stop.png',
      'start.png',
      'succ.png',
      'nosucc.png',
      'pause.png',
    ];
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
