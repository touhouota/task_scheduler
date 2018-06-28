import React from 'react';
import PropTypes from 'prop-types';

import Base from '../../lib/base_object';

class TaskDetails extends React.Component {
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
            className="icon modify"
            src={`${path}/assets/modify.png`}
            onClick={this.modifyModalOpen}
          />
          <img
            className="icon start"
            src={`${path}/assets/start.png`}
            onClick={this.clickButtonEvent}
          />
          <img
            className="icon pause"
            src={`${path}/assets/pause.png`}
            onClick={this.clickButtonEvent}
            value={this.props.taskData.id}
          />
          <img
            className="icon succ"
            src={`${path}/assets/succ.png`}
            onClick={(event) => {
              this.clickFinishButtonEvent(event, this.Finish);
            }}
            value={this.props.taskData.id}
          />
          <img
            className="icon stop"
            src={`${path}/assets/stop.png`}
            onClick={(event) => {
              this.clickFinishButtonEvent(event, this.Incomplete);
            }}
            value={this.props.taskData.id}
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
};

export default TaskDetails;
