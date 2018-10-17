import React from 'react';
import ReactDOM from 'react-dom';

import ReflectionMain from './components/members_reflection/reflection_main';

window.onload = () => {
  console.log('読み込んでる！');

  const target = document.getElementById('reflection');
  ReactDOM.render(<ReflectionMain />, target);
};
