import React from 'react';

class Structure extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="Structure">
        {this.props.structureName}
      </div>
    );
  }
}

export default Structure;
