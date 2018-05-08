import React from 'react';
import PropTypes from 'prop-types';

import TaskForm from './TaskForm';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.options = [{
      value: 'thema',
      label: 'テーマ探し',
    }, {
      value: 'survay',
      label: '文献調査',
    },
    {
      value: 'develop',
      label: '実装関連',
    },
    {
      value: 'experiment',
      label: '実験関係',
    }, {
      value: 'write',
      label: '論文執筆',
    },
    {
      value: 'everyday',
      label: 'その他',
    },
    ];
  }

  render() {
    return (
      <form className="modal hide" id="modal_area">
        <h2>タスクを登録</h2>
        <label>
          タスク名 *：
          <TaskForm
            type="text"
            name="task_name"
            placeholder="例：計画を立てる。"
          />
        </label>

        <label>
          タスク属性 *：
          <select defaultValue="thema" name="task_label">
            {this.options.map(d => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          予定時間 *：
          <TaskForm
            type="date"
            name="date"
          />
          <TaskForm
            type="time"
            name="time"
          />
        </label>

        <label>
          予想作業時間(分) *：
          <TaskForm
            type="number"
            name="expect_minute"
            placeholder="入力するか選んで▼"
          />
        </label>

        <label>
          メモ ：
          <TaskForm
            type="textarea"
            name="task_memo"
            placeholder="タスク実行時に気をつけることなどをメモしておこう。"
          />
        </label>

        <button type="button" onClick={this.props.reRender}>
          送信
        </button>
      </form>
    );
  }
}

Modal.propTypes = {
  reRender: PropTypes.func.isRequired,
};

export default Modal;
