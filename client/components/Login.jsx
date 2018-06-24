import React from 'react';

import Base from '../lib/base_object';

const Login = () => {
  const path = Base.get_path();
  return (
    <form id="loginForm" action={`${path}/api/login`} method="get">
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
};

export default Login;
