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
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((json) => {
        console.log(json);
        if (json.user_id === undefined) {
          return alert('ユーザ名が見つかりません。\n見直してください。');
        }
        window.location.href = `/main/${json.user_id}`;
      });
  }

  render() {
    return (
      <form id="loginForm">
        <label>
            ユーザID:
          <input type="text" name="user_id" />
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