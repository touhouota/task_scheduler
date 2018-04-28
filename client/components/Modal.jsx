import React from 'react';

import TaskForm from './TaskForm';
import ModalProcess from '../lib/modal_process';

class Modal extends React.Component {
  constructor() {
    super();
    this.options = [{
      value: 'survay',
      label: '文献・調査',
    },
    {
      value: 'develop',
      label: '提案・実装',
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
      label: '生活',
    },
    ];
  }

  render() {
    return (
      <form className="modal">
        <h2>タスクを登録</h2>
        <label>
          タスク名：
          <TaskForm
            type="text"
            name="task_name"
            placeholder="例：計画を立てる。"
          />
        </label>

        <label>
          タスク属性：
          <select defaultValue="survay">
            {this.options.map(d => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          メモ：
          <TaskForm
            type="textarea"
            name="task_memo"
            placeholder="タスク実行時に気をつけることなどをメモしておこう。"
          />
        </label>

        <button type="button" onClick={ModalProcess.send}>
          送信
        </button>
      </form>
    );
  }
}

export default Modal;
