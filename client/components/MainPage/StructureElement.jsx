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
      <div className="StructureElement">
        <img
          src={`/public/image/${this.status[this.props.task.status]}`}
          alt="タスクの状態"
        />
        <p className="StructureElementName">{props.task.t_name}</p>
        <p className="StructureElementMemo">{props.task.memo}</p>
      </div>
    );
  }
}

export default StructureElement;
