import React from 'react';

import TaskList from './TaskList';
import Modal from './Modal';

const TaskSide = () => (
  <div>
    <TaskList />
    <div className="after_plan">
      計画
    </div>
    <Modal />
  </div>
);

export default TaskSide;
