import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.taskData,
    };
    this.statusNo = [
      'タスク実行',
      '実行中',
      '完了',
      '未完了',
      '一時停止',
    ];
    // タスク実行
    this.Doing = 1;
    // タスク完了
    this.Finish = 2;
    // タスクが途中だったり未完了だったり
    this.Incomplete = 3;
  }

  // 見積もり時間があれば、それを置く
  displayExpectedTime() {
    if (this.state.task.expect_minute) {
      return (
        <p className="expect_minute">
          見積り：{this.state.task.expect_minute}分
        </p>
      );
    }
    return null;
  }

  // メモがあれば表示する
  displayMemo() {
    if (this.state.task.memo) {
      return (
        <p className="memo">
        メモ：{this.state.task.memo}
        </p>
      );
    }
    return null;
  }

  // タスク実行時に表示する
  displayTaskFinishButton() {
    if (this.state.task.status === 1) {
      return (
        <div>
          <button
            type="button"
            onClick={(event) => { this.statusChange(event, this.Finish); }}
            value={this.state.task.id}
          >
            終了
          </button>
          <button
            type="button"
            onClick={(event) => { this.statusChange(event, this.Incomplete); }}
            value={this.state.task.id}
          >
            未完了
          </button>
        </div>
      );
    }
    return null;
  }

  updateStatus(task) {
    // console.log('updateStatus from Task:', task, this.state.task);
    this.setState({
      task,
    });
    this.props.updateTaskList(task);
  }

  statusChange(event, nextStatus) {
    const formData = new FormData();
    formData.append('id', event.target.value);
    formData.append('status', nextStatus);
    formData.append('user_id', Base.get_cookie('user_id'));

    const path = Base.get_path();
    fetch(`${path}/api/task/statusChange`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
      body: formData,
    })
      .then(response => response.json())
      .then((json) => {
        // Task要素の変更をstateにしなければいけない。
        console.table(json);
        this.updateStatus(json);
        // console.log('statusChange:', this);
      });
  }

  render() {
    return (
      <div className="task_element">
        <button
          type="button"
          onClick={(event) => { this.statusChange(event, this.Doing); }}
          value={this.state.task.id}
        >
          {this.statusNo[this.state.task.status]}
        </button>
        <span className="task_name">
          {this.state.task.t_name}
        </span>
        {this.displayExpectedTime()}
        {this.displayMemo()}
        {this.displayTaskFinishButton()}
      </div>);
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
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
  }).isRequired,
};


export default Task;
