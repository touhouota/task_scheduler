import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';

class Task extends React.Component {
  constructor(props) {
    super(props);
    // タスクの状態とindexを合わせる
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
    // 関数たちをthisで使えるようにバインド
    this.taskStart = this.taskStart.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.TimerManager = props.TimerManager;

    // このタスクが実行状態の場合、実行する
    if (this.props.taskData.status === this.Doing) {
      this.TimerManager.set(this.props.taskData.id);
    }
  }


  displayActualTime() {
    return (
      <span className="actual_sec">
        {this.props.TimerManager.convert_hms_from_seconds(this.props.taskData.actual_sec)}
      </span>
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
    this.props.updateTaskList(task);
  }

  // 実行できるかを確認する
  taskStart(taskId, nextStatus) {
    // 次の状態が実行でないとき => タスクが動いているのを止めるだけで良い
    if (nextStatus !== this.Doing) {
      console.log('taskStart: このタスクを止める=>', taskId);
      this.statusChange(taskId, nextStatus);
      this.TimerManager.clear();
      return null;
    }

    // ここまで来たときは、タスクを実行するとき
    // 他のタスクが動いていないかを確認
    if (this.TimerManager.isDoing()) {
      // 動いている場合は、一旦止める
      this.statusChange(this.TimerManager.getDoingTaskId(), this.Suspend);
      this.TimerManager.clear();
    }

    // タスクの更新を送信する
    this.statusChange(taskId, nextStatus);
    this.TimerManager.set(taskId);
    return null;
  }

  setTaskInformation(taskId, nextStatus) {
    const task = this.props.taskData;
    // const formData = new FormData();
    const formData = Base.createFormData();
    // formData.append('user_id', Base.get_cookie('user_id'));
    formData.append('id', taskId);
    formData.set('status', nextStatus);
    if (nextStatus === this.Doing) {
      // 次が実行のとき(今が動いていないとき)、そのまま今の時間を送る
      formData.set('actual_sec', task.actual_sec);
    } else {
      // 次が実行でないとき(今が動いているとき)、これまでの進捗と計測した時間を合わせて送る
      const actualSec = this.props.TimerManager.calcActualTime(task.updated_at) + task.actual_sec;
      formData.set('actual_sec', parseInt(actualSec || 0, 10));
    }

    return formData;
  }

  clickButtonEvent(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const task = Base.parents(event.target, 'task_element');
    let nextStatus = null;
    if (this.props.taskData.status === this.Doing) {
      nextStatus = this.Suspend;
    } else {
      nextStatus = this.Doing;
    }
    this.taskStart(task.id, nextStatus);
  }


  // 状態変更だけをする
  statusChange(taskId, nextStatus) {
    const formData = this.setTaskInformation(taskId, nextStatus);

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
      <div
        className="task_element"
        id={this.props.taskData.id}
        data-status={this.props.taskData.status}
        data-start_date={this.props.taskData.updated_at}
        data-progress={this.props.taskData.actual_sec}
      >
        <button
          type="button"
          onClick={(event) => { this.clickButtonEvent(event); }}
        >
          {this.statusNo[this.props.taskData.status]}
        </button>
        <span className="task_name">
          {this.props.taskData.t_name}
        </span>
        <span className="expect_minute">
          ({this.props.taskData.expect_minute}分)
        </span>
        <p>
          作業時間：
          {this.displayActualTime()}
        </p>
        {this.displayMemo()}
        {this.displayTaskFinishButton()}
      </div>);
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    // タスクID
    id: PropTypes.number,
    // タスク名
    name: PropTypes.string,
    // 作業時間(秒)
    actual_sec: PropTypes.number,
    // 作成日時
    created_at: PropTypes.string,
    // 削除されたかのフラグ
    deleted: PropTypes.number,
    // 予想時間(分)
    expect_minute: PropTypes.number,
    // タスクのラベル
    label: PropTypes.string,
    // 作業につけたメモ
    memo: PropTypes.string,
    // 振り返り時のメモ
    reflection: PropTypes.string,
    // タスクの状態
    status: PropTypes.number,
    // 更新日時
    updated_at: PropTypes.string,
    // タスクのユーザ
    user_id: PropTypes.string,
  }).isRequired,
};


export default Task;
