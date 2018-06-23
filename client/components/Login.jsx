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
    userInfo.append('X-CSRF-Token', Base.get_token());
    const path = Base.get_path();
    fetch(`${path}/api/login`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
      body: userInfo,
    });
    // .then((response) => {
    //   console.log(response);
    //   if (!response.ok) {
    //     throw Error(response.statusText);
    //   }
    //   return response.json();
    // })
    // .then((json) => {
    //   if (json.user_id === undefined) {
    //     /*
    //      * user_idがないときは、入力ミス
    //      */
    //     return alert('ユーザ名が見つかりません。\n見直してください。');
    //   }
    //
    //   /*
    //    * IDが含まれているときは、ユーザが存在するので、そのユーザとしてログインする
    //    */
    //   const expires = new Date();
    //   expires.setMonth(expires.getMonth() + 1);　 // 有効期限: １ヶ月間
    //   const cookieString = [
    //     `user_id=${json.user_id}`,
    //     `expires=${expires.toUTCString()}`, // 有効期限: １ヶ月間
    //     `path=${Base.get_path()}`,
    //   ];
    //   // document.cookie = cookieString.join(';');
    //   const path = Base.get_path();
    //   // window.location.href = `${path}/structure/main/${json.user_id}`;
    //   return null;
    // });
  }

  render() {
    return (
      <form id="loginForm" action={`${Base.get_path()}/api/login`}>
        <label>
            ユーザID:
          <input type="text" name="user_id" />
            @fun.ac.jp
        </label>
        <br />
        <button
          type="submit"

        >
          ログイン
        </button>
      </form>
    );
  }
}

export default Login;
