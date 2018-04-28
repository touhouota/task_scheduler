import React from 'react';


const TaskForm = (props) => {
  if (props.type === 'textarea') {
    return (
      <textarea
        name={props.name}
        placeholder={props.placeholder}
      />
    );
  }
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value=""
    />
  );
};

export default TaskForm;
