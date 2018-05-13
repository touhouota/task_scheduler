import React from 'react';
import PropTypes from 'prop-types';

import TaskForm from './TaskForm';

import Base from '../../lib/base_object';
import ModalProcess from '../../lib/modal_process';

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

    this.state = {
      status: {
        task_name: false,
        expect_minute: null,
      },
      message: {
        task_name: false,
        expect_minute: null,
      },
    };
    this.chechValidate = this.chechValidate.bind(this);
  }

  chechValidate(formName, event) {
    const nowState = this.state;
    console.log('checkValidation:', formName);
    switch (formName) {
      case 'task_name':
        if (event.target.validationMessage) {
          nowState.status.task_name = false;
          nowState.message.task_name = event.target.validationMessage;
        } else {
          nowState.status.task_name = true;
          nowState.message.task_name = null;
        }
        break;
      case 'expect_minute':
        if (event.target.validationMessage) {
          nowState.status.expect_minute = false;
          nowState.message.expect_minute = event.target.validationMessage;
        } else {
          nowState.status.expect_minute = true;
          nowState.message.expect_minute = null;
        }
        break;
      default:
    }

    this.setState({
      status: nowState.status,
      message: nowState.message,
    });
    console.log('checkValidation finished:', this.state.status.task_name === false || this.state.status.expect_minute === false);
  }

  // データの更新をMainPageへ依頼する
  updateTaskList(task) {
    this.props.updateTaskList(task);
  }

  // 送信できる状態か確認する
  checkSendable() {
    console.log('checkSendable');
    console.log(this.state.status.task_name === false, this.state.status.expect_minute === false);
    const values = Object.values(this.state.status);
    // 必須項目の数を数える
    const counts = values.length;
    // trueになっている項目を残す
    const checked = values.filter(item => item);
    // 同じ個数の場合は、送信できる
    return counts === checked.length;
  }

  // Formのデータをサーバへ送る
  sendForm(event) {
    // デフォルトの動きを止める
    event.preventDefault();
    if (!this.checkSendable()) {
      alert('フォームに不備があります');
      return null;
    }
    console.log('send form information');
    const form = document.getElementById('modal_area');
    const formData = ModalProcess.getModalData(form);
    console.log(formData);
    fetch('/api/tasks/create/', {
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
        this.updateTaskList(json);
      });
    ModalProcess.close();
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
            required="true"
            checkValidation={this.chechValidate}
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
          予想作業時間(分) *：
          <TaskForm
            type="number"
            name="expect_minute"
            placeholder="入力するか選んで▼"
            required="true"
            checkValidation={this.chechValidate}
          />
        </label>

        <label>
          予定時間：
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
          メモ ：
          <TaskForm
            type="textarea"
            name="task_memo"
            placeholder="タスク実行時に気をつけることなどをメモしておこう。"
          />
        </label>

        <button
          type="button"
          onClick={(event) => { this.sendForm(event); }}
          disabled={this.state.status.task_name === false || this.state.status.expect_minute === false}
        >
          送信
        </button>
      </form>
    );
  }
}

Modal.propTypes = {
  updateTaskList: PropTypes.func.isRequired,
};

export default Modal;
