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
    this.clickableIconChange = this.clickableIconChange.bind(this);
    this.clickButtonEvent = this.clickButtonEvent.bind(this);
    this.modifyModalOpen = this.modifyModalOpen.bind(this);
    this.TimerManager = props.TimerManager;

    // このタスクが実行状態の場合、実行する
    if (props.taskData.status === this.Doing) {
      this.TimerManager.set(this.props.taskData.id);
    }
  }

  // renderされたときの処理
  componentDidMount() {
    console.log('componentDitUpdate');
    this.clickableIconChange();
  }

  // コンポーネントの更新が起こったときに行われる処理
  componentDidUpdate() {
    console.log('shouldComponentUpdate');
    this.clickableIconChange();
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

  clickableIconChange() {
    // いったんすべてのアイコンからClickableクラスを取る
    const task = document.getElementById(this.props.taskData.id);
    const iconArea = task.querySelector('.icon_area');
    const icons = Array.from(iconArea.children);
    // modifyを無視する
    icons.shift();
    icons.forEach((icon) => {
      icon.classList.remove('clickable');
    });

    console.log('now_status:', this.props.taskData.status);

    // 現在のタスクの状態により、場合分けする
    if (this.props.taskData.status === this.Doing) {
      // 今が実行中のとき、それ以外のアイコンを押せるようにする
      icons.forEach((icon) => {
        if (!icon.classList.contains('start')) {
          icon.classList.add('clickable');
        }
      });
    } else {
      icons.forEach((icon) => {
        if (icon.classList.contains('start')) {
          icon.classList.add('clickable');
        }
      });
    }
  }

  clickButtonEvent(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (!event.currentTarget.classList.contains('clickable')) {
      // クリックできないならば、詳細モーダルを表示する
      this.displayThisDetails(event);
      return null;
    }
    // クリックできる状態ならタスクの状態を変更する
    const taskContainer = Base.parents(event.currentTarget, 'task_container');
    const task = taskContainer.querySelector('.task_element');
    let nextStatus = null;
    if (this.props.taskData.status === this.Doing) {
      nextStatus = this.Suspend;
    } else {
      nextStatus = this.Doing;
    }
    this.taskStart(task.id, nextStatus);
    return null;
  }

  clickFinishButtonEvent(event, nextStatus) {
    console.log(event, nextStatus);
    if (!event.currentTarget.classList.contains('clickable')) {
      // クリックできないならば、無視
      return null;
    }

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
        document.querySelector('.modal_back').click();
      }
    }, 200);
    return null;
  }

  displayActualTime() {
    return (
      <span className="actual_sec">
        {this.props.TimerManager.convert_hms_from_seconds(this.props.taskData.actual_sec)}
      </span>
    );
  }

  displayExpectMinute() {
    const expectMinute = this.props.taskData.expect_minute;
    return (
      <span className="expect_minute">
        ({this.props.TimerManager.convert_hms_from_seconds(expectMinute * 60)})
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

  // 修正用のモーダルを開く
  modifyModalOpen(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const modifyModal = document.getElementById(`modify_${this.props.taskData.id}`);
    ModalProcess.init();
    ModalProcess.getModalBack().addEventListener('click', () => {
      modifyModal.classList.add('hide');
    });
    console.log('modifyModalOpen', modifyModal);
    modifyModal.classList.remove('hide');
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
    const path = Base.get_path();
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
            <span className="task_name">
              {this.props.taskData.t_name}
            </span>
          </div>

          {/* 作業時間 */}
          <div className="times">
            <img
              className="icon timer_icon"
              src={`${path}/assets/time.png`}
              alt="作業時間"
            />
            {this.displayActualTime()}経過
            {this.displayExpectMinute()}
          </div>

          <div className="icon_area">
            <img
              className="icon modify"
              src={`${path}/assets/modify.png`}
              alt="タスク修正"
              onClick={this.modifyModalOpen}
            />
            <img
              className="icon start"
              src={`${path}/assets/start.png`}
              alt="実行"
              onClick={this.clickButtonEvent}
            />
            <img
              className="icon pause"
              src={`${path}/assets/pause.png`}
              alt="一時停止"
              onClick={this.clickButtonEvent}
              value={this.props.taskData.id}
            />
            <img
              className="icon succ"
              src={`${path}/assets/succ.png`}
              alt="タスク完了"
              onClick={(event) => {
                this.clickFinishButtonEvent(event, this.Finish);
              }}
              value={this.props.taskData.id}
            />
            <img
              className="icon stop"
              src={`${path}/assets/stop.png`}
              alt="保留・取りやめ"
              onClick={(event) => {
                this.clickFinishButtonEvent(event, this.Incomplete);
              }}
              value={this.props.taskData.id}
            />
          </div>
        </div>

        {/* タスクの詳細置き場 */}
        <TaskDetails
          taskData={this.props.taskData}
          TimerManager={this.TimerManager}
          clickButtonEvent={this.clickButtonEvent}
          clickFinishButtonEvent={this.clickFinishButtonEvent}
          taskStart={this.taskStart}
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
