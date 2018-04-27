import React from 'react';


const TaskForm = (props) => {
  console.log(props);
  if (props.type === 'textarea') {
    return (
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value=""
      />
    );
  }
  return (
    <textarea
      name={props.name}
      placeholder={props.placeholder}
    >
        hoge
    </textarea>
  );
};

export default TaskForm;
