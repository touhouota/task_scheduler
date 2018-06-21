import React from 'react';
import PropTypes from 'prop-types';

import TaskForm from '../MainPage/TaskForm';

import Base from '../../lib/base_object';
import ModalProcess from '../../lib/modal_process';

class ModifyModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.options = [{
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

  taskModify() {

  }

  render() {
    return (
      <form className={`modify_modal modify_${this.props.task.id}`}>
        <h2>タスクの修正</h2>
        <label>
          <span className="modal_label">
              タスク名 *：
          </span>
          <TaskForm
            type="text"
            name="task_name"
            placeholder="例：計画を立てる。"
            required="true"
            value={this.props.task.t_name}
            checkValidation={this.chechValidate}
          />
        </label>

        <label>
          <span className="modal_label">
              タスク属性 *：
          </span>
          <select defaultValue={this.props.task.label} name="task_label">
            {this.options.map(d => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="modal_label">
              予想時間(分) *：
          </span>
          <TaskForm
            type="number"
            name="expect_minute"
            placeholder="入力するか選んで▼"
            value={this.props.task.expect_minute}
            required="true"
          />
        </label>

        <label>
          <span className="modal_label">
              メモ ：
          </span>
          <TaskForm
            type="textarea"
            name="task_memo"
            placeholder="タスク実行時に気をつけることなどをメモしておこう。"
            value={this.props.task.memo}
          />
        </label>

        <button
          type="button"
          onClick={this.taskModify}
        >
            タスクを修正
        </button>
      </form>
    );
  }
}

export default ModifyModal;
