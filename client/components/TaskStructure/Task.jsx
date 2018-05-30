import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';

class Task extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   task: props.taskData,
    // };
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
    // 一時停止
    this.Suspend = 4;
    this.taskStart = this.taskStart.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.TimerManager = props.TimerManager;
  }

  // 見積もり時間があれば、それを置く
  displayExpectedTime() {
    if (this.props.taskData.expect_minute) {
      return (
        <p className="expect_minute">
          見積り：{this.props.taskData.expect_minute}分
        </p>
      );
    }
    return null;
  }

  displayActualTime() {
    return (
      <span className="actual_sec">{this.props.taskData.actual_sec}</span>
    );
  }

  // メモがあれば表示する
  displayMemo() {
    if (this.props.taskData.memo) {
      return (
        <p className="memo">
        メモ：{this.props.taskData.memo}
        </p>
      );
    }
    return null;
  }

  // タスク実行時に表示する
  displayTaskFinishButton() {
    if (this.props.taskData.status === 1) {
      return (
        <div>
          <button
            type="button"
            onClick={(event) => {
              const task = Base.parents(event.target, 'task_element');
              this.taskStart(task.id, this.Finish);
            }}
            value={this.props.taskData.id}
          >
            終了
          </button>
          <button
            type="button"
            onClick={(event) => {
              const task = Base.parents(event.target, 'task_element');
              this.taskStart(task.id, this.Incomplete);
            }}
            value={this.props.taskData.id}
          >
            未完了
          </button>
        </div>
      );
    }
    return null;
  }

  updateStatus(task) {
    // console.log('updateStatus from Task:', task, this.props.taskData);
    // if (task.id === this.props.taskData.id) {
    //   this.setState({
    //     task,
    //   });
    // }
    this.props.updateTaskList(task);
  }

  // 実行できるかを確認する
  taskStart(taskId, nextStatus) {
    // 次の状態が実行でないとき => タスクが動いているのを止めるだけで良い
    if (nextStatus !== this.Doing) {
      this.TimerManager.clear();
      this.statusChange(taskId, nextStatus);
      return null;
    }

    // ここまで来たときは、タスクを実行するとき
    // 他のタスクが動いていないかを確認
    if (this.TimerManager.isDoing()) {
      // 動いている場合は、一旦止める
      this.statusChange(this.TimerManager.getDoingTaskId(), this.Suspend);
      this.TimerManager.clear();
    }
    this.statusChange(taskId, nextStatus);
    this.TimerManager.set(taskId);
    return null;
  }

  setTaskInformation() {
    const formData = new FormData();
    Object(this.props.taskData).keys();
  }

  // 状態変更だけをする
  statusChange(taskId, nextStatus) {
    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('status', nextStatus);

    const path = Base.get_path();
    fetch(`${path}/api/task/statusChange/`, {
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
      <div
        className="task_element"
        id={this.props.taskData.id}
        data-status={this.props.taskData.status}
        data-start_date={this.props.taskData.updated_at}
        data-progress={this.props.taskData.actual_sec}
      >
        <button
          type="button"
          onClick={(event) => {
            const task = Base.parents(event.target, 'task_element');
            let nextStatus = null;
            if (this.props.taskData.status === this.Doing) {
              nextStatus = this.Suspend;
            } else {
              nextStatus = this.Doing;
            }
            this.taskStart(task.id, nextStatus);
          }}
          value={this.props.taskData.id}
        >
          {this.statusNo[this.props.taskData.status]}
        </button>
        <span className="task_name">
          {this.props.taskData.t_name}
        </span>
        {this.displayExpectedTime()}
        <p>作業時間：{this.displayActualTime()}分</p>
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
