import React from 'react';

import Task from './Task';

const TaskList = (props) => {
  const tasks = props.taskList.map(task => <Task taskData={task} key={task.id} />);
  return (
    <div className="task_container">
      <p>タスク一覧</p>
      <div className="tasks">
        {tasks}
      </div>
    </div>
  );
};

export default TaskList;
