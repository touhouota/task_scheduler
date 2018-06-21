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
    this.state = {
      // 入力されているかどうか
      task_name: Boolean(props.task.t_name),
      expect_minute: Boolean(props.task.expect_minute),
    };
    this.taskModify = this.taskModify.bind(this);
    this.chechValidate = this.chechValidate.bind(this);
  }

  chechValidate(formName, event) {
    const nowState = this.state;
    console.log('checkValidation:', formName, this.state);
    switch (formName) {
      case 'task_name':
        if (event.target.validationMessage) {
          nowState.task_name = false;
        } else {
          nowState.task_name = true;
        }
        break;
      case 'expect_minute':
        if (event.target.validationMessage) {
          nowState.expect_minute = false;
        } else {
          nowState.expect_minute = true;
        }
        break;
      default:
    }

    this.setState({
      task_name: nowState.task_name,
      expect_minute: nowState.expect_minute,
    });
  }

  taskModify() {
    const modal = document.getElementById(`modify_${this.props.task.id}`);
    console.log(modal);
    const modalData = ModalProcess.getModalData(modal);
    modalData.append('id', this.props.task.id);
    // TODO: タスクの情報をサーバへ送る
    const path = Base.get_path();
    fetch(`${path}/api/task/modify`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
      credentials: 'same-origin',
      body: modalData,
    })
      .then(response => response.json())
      .then((json) => {
        // きちんと処理が終わったら、更新する
        this.props.updateTaskList(json);
        // モーダルを閉じる
        modal.classList.add('hide');
        // TODO: モーダルを閉じる処理をあれこれ
        ModalProcess.backgroundClose();
      });
  }

  render() {
    return (
      <form className="modify_modal hide" id={`modify_${this.props.task.id}`}>
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
            checkValidation={this.chechValidate}
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
          disabled={!this.state.task_name || !this.state.expect_minute}
        >
            タスクを修正
        </button>
      </form>
    );
  }
}

export default ModifyModal;
