import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';

import Base from './lib/base_object';

window.onload = () => {
  const userId = Base.get_cookie('user_id');
  if (userId) {
    // すでにIDがある場合は、ログインページを飛ばす
    const path = Base.get_path();
    window.location.href = `${path}/structure/main/${userId}`;
  } else {
    ReactDOM.render(
      <Login />,
      document.getElementById('login'),
    );
  }
};
