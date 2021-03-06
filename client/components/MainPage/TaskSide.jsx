import React from 'react';
import PropTypes from 'prop-types';

import TaskList from './TaskList';
import Modal from './Modal';

const TaskSide = props => (
  <div className="TaskSide">
    <TaskList taskList={props.taskList} updateTaskList={props.updateTaskList} />
    <Modal updateTaskList={props.updateTaskList} />
  </div>
);

TaskSide.propTypes = {
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
  updateTaskList: PropTypes.func.isRequired,
};

export default TaskSide;
