import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  createMinuteList() {
    const minute = 0;
    const list = [];
    let i = 0;
    for (i = 5; i <= 60; i += 5) {
      list.push(i);
    }
    return list;
  }

  createTimeList() {
    let hour = 0;
    let minute = 0;
    const list = [];
    for (; hour < 24; minute += 30) {
      const hour_str = (`0${hour}`).slice(-2);
      const minute_str = (`0${minute}`).slice(-2);
      list.push(`${hour_str}:${minute_str}`);
      if (minute >= 30) {
        minute = -30;
        hour += 1;
      }
    }
    return list;
  }

  createList(list, defaultValue) {
    return list.map((item, index) => {
      if (item === defaultValue) {
        return (<option value={item} key={`optId:${index}`} selected>{item}</option>);
      }
      return (<option value={item} key={`optId:${index}`}>{item}</option>);
    });
  }

  render() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          name={this.props.name}
          placeholder={this.props.placeholder}
        />
      );
    } else if (this.props.type === 'time') {
      return (
        <span>
          <input
            type={this.props.type}
            name={this.props.name}
            list="timeList"
          />
          <datalist id="timeList">
            {this.createList(this.createTimeList())}
          </datalist>
        </span>
      );
    } else if (this.props.type === 'number') {
      return (
        <span>
          <input
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            list="minuteList"
          />
          <datalist id="minuteList">
            {this.createList(this.createMinuteList(), 25)}
          </datalist>
        </span>
      );
    }
    return (
      <input
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default TaskForm;
