import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';

window.onload = () => {
  ReactDOM.render(
    <Login />,
    document.getElementById('login'),
  );
};
