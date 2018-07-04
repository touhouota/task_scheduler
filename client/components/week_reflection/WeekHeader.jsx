import React from 'react';

class WeekHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        {this.props.sum}
      </header>
    );
  }
}

export default WeekHeader;
