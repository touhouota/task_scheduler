import React from 'react';


const TaskForm = () => {
  if (this.props.type === 'textarea') {
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        value=""
      />
    );
  }
  return (
    <textarea
      name={this.props.name}
      placeholder={this.props.placeholder}
    >
        hoge
    </textarea>
  );
};

export default TaskForm;
