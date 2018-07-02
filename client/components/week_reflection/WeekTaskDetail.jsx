import React from 'react';

import TaskDetails from '../TaskStructure/TaskDetails';

class WeekTaskDetails extends TaskDetails {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="task_detail hide" >
        WeekTaskDetails
        <div className="icon_area">
          <div className="icon" />
        </div>
      </div>
    );
  }
}

export default WeekTaskDetails;
