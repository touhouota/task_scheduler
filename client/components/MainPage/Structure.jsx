import React from 'react';

class Structure extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="Structure">
        <p>{this.props.structureName}</p>
        <div className="StructureElements">
          要素置き場
        </div>
      </div>
    );
  }
}

export default Structure;
