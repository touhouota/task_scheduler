import React from 'react';
import PropTypes from 'prop-types';

import TaskForm from '../MainPage/TaskForm';

import Base from '../../lib/base_object';
import ModalProcess from '../../lib/modal_process';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.labelList;

    this.state = {
      status: {
        task_name: false,
        expect_minute: null,
      },
      message: {
        task_name: false,
        expect_minute: null,
      },
      labelDepth: [props.label],
    };
    this.chechValidate = this.chechValidate.bind(this);
    // this.createLabelList = this.createLabelList.bind(this);
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

  // createLabelList(labelMap, label) {
  //   const labelList = [];
  //   const checkedList = [];
  //   const searchList = [labelMap];
  //   let currentList;
  //   while (currentList = searchLabel.shift()) {
  //     if (currentList.has(label)) {
  //       labelList.push([label, labelMap.get(label).get('name')]);
  //       break;
  //     } else {
  //       currentList.get('subLabel').forEach((mapObject, label) => {
  //         checkedList.push(label);
  //         searchList.push(mapObject);
  //       });
  //     }
  //   }
  // }
  createLabelList() {
    return (
      <TaskForm
        type="radio"
      />
    );
  }

  // データの更新をMainPageへ依頼する
  updateTaskList(task) {
    this.props.updateTaskList(task);
  }

  // 送信できる状態か確認する
  checkSendable() {
    // console.log('checkSendable');
    // console.log(this.state.status.task_name === false, this.state.status.expect_minute === false);
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
    const form = document.querySelector(`.${this.props.label}_modal`);
    const formData = ModalProcess.getModalData(form);
    // console.log(formData);
    const path = Base.get_path();
    fetch(`${path}/api/tasks/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
      credentials: 'same-origin',
      body: formData,
    })
      .then(response => response.json())
      .then((json) => {
        this.updateTaskList(json);
      });
    ModalProcess.close(this.props.label);
  }

  render() {
    return (
      <form className={`modal hide ${this.props.label}_modal`} id="modal_area">
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
          {this.state.labelDepth.join(' > ')}
          {this.createLabelList()}
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
