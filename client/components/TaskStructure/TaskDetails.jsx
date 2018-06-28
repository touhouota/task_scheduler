import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';
import ModalProcess from '../../lib/modal_process';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    // タスク実行
    this.Doing = 1;
    // タスク完了
    this.Finish = 2;
    // タスクが途中だったり未完了だったり
    this.Incomplete = 3;
    // 一時停止
    this.Suspend = 4;
  }

  /*
   * ライフサイクルメソッド
   */

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

  /*
   * 独自定義
   */


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
    this.props.taskStart(task.id, nextStatus);
    setTimeout(() => {
      // もし、モーダルが開いていた場合、閉じる
      if (ModalProcess.isModalOpen()) {
        document.querySelector('.modal_back').click();
      }
    }, 200);
    return null;
  }

  clickableIconChange() {
    const task = document.getElementById(this.props.taskData.id);
    const taskContainer = Base.parents(task, 'task_container');
    const detail = taskContainer.querySelector('.task_detail');
    const icons = Array.from(detail.querySelectorAll('.icon'));
    icons.forEach((icon) => {
      icon.classList.remove('clickable');
    });

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


  render() {
    const path = Base.get_path();
    return (
      <div
        className="task_detail hide"
        data-status={this.props.taskData.status}
        data-start_date={this.props.taskData.updated_at}
        data-progress={this.props.taskData.actual_sec}
      >
        <div className="task_top">
          {/* タスク名, 実行ボタン, 予想時間 */}
          <div className="task_button">
            <p className="expect_minute">
                ({this.props.taskData.expect_minute}分)
            </p>
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
          <span className="actual_sec">
            {this.props.TimerManager.convert_hms_from_seconds(this.props.taskData.actual_sec)}
          </span>
        </div>

        {/* タスクのメモ */}
        <div className="memo">
          メモ：
          <p className="memo_text">
            {this.props.taskData.memo}
          </p>
        </div>

        <div className="icon_area">
          <img
            className="icon start"
            src={`${path}/assets/start.png`}
            onClick={this.props.clickButtonEvent}
          />
          <img
            className="icon pause"
            src={`${path}/assets/pause.png`}
            onClick={this.props.clickButtonEvent}
          />
          <img
            className="icon succ"
            src={`${path}/assets/succ.png`}
            onClick={(event) => {
              this.props.clickFinishButtonEvent(event, this.Finish);
            }}
          />
          <img
            className="icon stop"
            src={`${path}/assets/stop.png`}
            onClick={(event) => {
              this.props.clickFinishButtonEvent(event, this.Incomplete);
            }}
          />
        </div>
      </div>
    );
  }
}

TaskDetails.propTypes = {
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
  // ボタンがクリックされたときの関数
  clickButtonEvent: PropTypes.func.isRequired,
  taskStart: PropTypes.func.isRequired,
};

export default TaskDetails;
