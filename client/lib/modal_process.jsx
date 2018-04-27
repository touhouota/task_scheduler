import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '../components/Modal';

const ModalProcess = {
  init: () => {
    console.log('hoge');
    const background = document.createElement('div');
    background.classList.add('bodal_back');
    document.body.appendChild(background);
    ReactDOM.render(<Modal />, background);
  },
};

export default ModalProcess;
