import React from 'react';

import Base from '../lib/base_object';

class Login extends React.Component {
  constructor() {
    super();
    this.sendUserInfo = this.sendUserInfo.bind(this);
  }

  sendUserInfo(event) {
    const loginForm = document.getElementById('loginForm');
    const userInfo = new FormData(loginForm);
    fetch('/api/login/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': Base.get_token(),
      },
      body: userInfo,
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
      });
  }

  render() {
    return (
      <form id="loginForm">
        <label>
            ユーザID:
          <input type="text" />
            @fun.ac.jp
        </label>
        <br />
        <button
          type="button"
          onClick={(event) => { this.sendUserInfo(event); }}
        >
          ログイン
        </button>
      </form>
    );
  }
}

export default Login;
