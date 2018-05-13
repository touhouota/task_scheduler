import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = (props) => {
  let tasks;
  console.log('TaskList:', props.taskList);
  if (props.taskList.length !== 0) {
    tasks = props.taskList.map(task =>
      (<Task
        taskData={task}
        updateTaskList={props.updateTaskList}
        key={task.id}
      />));
  } else {
    tasks = (<div>タスクはないよ</div>);
  }
  return (
    <div className="task_container">
      <p>タスク一覧</p>
      <div className="tasks">
        {tasks}
      </div>
    </div>
  );
};

// DBの構造をpropTypeとして定義
TaskList.propTypes = {
  taskList: PropTypes.arrayOf(PropTypes.shape({
    actual_sec: PropTypes.number,
    created_at: PropTypes.string,
    deleted: PropTypes.number,
    expect_minute: PropTypes.number,
    id: PropTypes.number,
    label: PropTypes.string,
    memo: PropTypes.string,
    name: PropTypes.string,
    reflection: PropTypes.string,
    status: PropTypes.number,
    updated_at: PropTypes.string,
    user_id: PropTypes.string,
  })).isRequired,
};

export default TaskList;
