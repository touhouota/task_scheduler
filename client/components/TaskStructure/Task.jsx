import React from 'react';
import PropTypes from 'prop-types';

import TaskDetails from './TaskDetails';
import ModifyModal from './ModifyModal';

import Base from '../../lib/base_object';
import ModalProcess from '../../lib/modal_process';

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
    this.displayActualTime = this.displayActualTime.bind(this);
    this.displayThisDetails = this.displayThisDetails.bind(this);
    this.displayTaskFinishButton = this.displayTaskFinishButton.bind(this);
    this.clickButtonEvent = this.clickButtonEvent.bind(this);
    this.TimerManager = props.TimerManager;

    // このタスクが実行状態の場合、実行する
    if (props.taskData.status === this.Doing) {
      this.TimerManager.set(this.props.taskData.id);
    }
    console.log('Task props.TimerManager:', props.TimerManager);
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

  updateStatus(task) {
    this.props.updateTaskList(task);
  }

  clickButtonEvent(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const taskContainer = Base.parents(event.currentTarget, 'task_container');
    const task = taskContainer.querySelector('.task_element');
    let nextStatus = null;
    if (this.props.taskData.status === this.Doing) {
      nextStatus = this.Suspend;
    } else {
      nextStatus = this.Doing;
    }
    this.taskStart(task.id, nextStatus);
  }

  clickFinishButtonEvent(event, nextStatus) {
    // イベントの伝播を止める
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    // 終了時の処理
    const taskContainer = Base.parents(event.currentTarget, 'task_container');
    const task = taskContainer.querySelector('.task_element');
    this.taskStart(task.id, nextStatus);
    setTimeout(() => {
      // もし、モーダルが開いていた場合、閉じる
      if (ModalProcess.isModalOpen()) {
        ModalProcess.getModalBack().click();
      }
    }, 200);
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
        <div className="finish_button">
          <button
            className="button"
            onClick={(event) => {
              this.clickFinishButtonEvent(event, this.Finish);
            }}
            value={this.props.taskData.id}
          >
            終了
          </button>
          <button
            className="button"
            onClick={(event) => {
              this.clickFinishButtonEvent(event, this.Incomplete);
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

  displayThisDetails(event) {
    console.log('click task', event);
    ModalProcess.init();
    const taskParentDOM = Base.parents(event.currentTarget, 'task_container');
    taskParentDOM.querySelector('.task_detail').classList.remove('hide');
    // モーダルにイベントを追加
    const closeDetailDOM = () => {
      taskParentDOM.querySelector('.task_detail').classList.add('hide');
    };
    ModalProcess.getModalBack().addEventListener('click', closeDetailDOM);
  }


  // 状態変更だけをする
  statusChange(taskId, nextStatus) {
    const formData = this.props.setTaskInformation(taskId, nextStatus);

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
      <div className="task_container">
        <div
          className="task_element"
          id={this.props.taskData.id}
          data-status={this.props.taskData.status}
          data-start_date={this.props.taskData.updated_at}
          data-progress={this.props.taskData.actual_sec}
          onClick={this.displayThisDetails}
        >
          <div className="task_top">
            {/* タスク名, 実行ボタン, 予想時間 */}
            <div className="task_button">
              <button
                className="button"
                onClick={this.clickButtonEvent}
              >
                {this.statusNo[this.props.taskData.status]}
              </button>
              <div className="expect_minute">
                ({this.props.taskData.expect_minute}分)
              </div>
            </div>
            <div className="title">
              <span className="task_name">
                {this.props.taskData.t_name}
              </span>
            </div>
          </div>

          {/* 作業時間 */}
          <div className="times">
            作業時間：
            {this.displayActualTime()}
          </div>
          {this.displayTaskFinishButton(this.props)}
        </div>

        {/* タスクの詳細置き場 */}
        <TaskDetails
          taskData={this.props.taskData}
          TimerManager={this.TimerManager}
          clickButtonEvent={this.clickButtonEvent}
          displayTaskFinishButton={this.displayTaskFinishButton}
        />
        <ModifyModal
          updateTaskList={this.props.updateTaskList}
          task={this.props.taskData}
        />
      </div>
    );
  }
}

Task.propTypes = {
  taskData: PropTypes.shape({
    // タスクID
    id: PropTypes.number,
    // タスク名
    t_name: PropTypes.string,
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
  // TimerManagerのオブジェクトを定義
  TimerManager: PropTypes.shape({
    // タイマーの設定
    set: PropTypes.func.isRequired,
    // タイマーの削除
    clear: PropTypes.func.isRequired,
    // 秒数をhh:mm:ssに変換
    convert_hms_from_seconds: PropTypes.func.isRequired,
    // タスク実行しているかの判定
    isDoing: PropTypes.func.isRequired,
    // 実行しているタスクidを取得
    getDoingTaskId: PropTypes.func.isRequired,
    // 作業時間の計算
    calcActualTime: PropTypes.func.isRequired,
  }).isRequired,
  // タスクリストの更新
  updateTaskList: PropTypes.func.isRequired,
};


export default Task;
