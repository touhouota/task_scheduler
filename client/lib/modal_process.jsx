import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '../components/Modal';

const ModalProcess = {
  init: () => {
    const background = document.createElement('div');
    background.addEventListener('click', ModalProcess.close);
    background.classList.add('modal_back');
    document.body.appendChild(background);
    ReactDOM.render(<Modal />, background);
  },

  close: () => {
    const modalBack = document.querySelector('.modal_back');
    document.body.removeChild(modalBack);
  },

  send: () => {
    console.log('send form information');
  },
};

export default ModalProcess;
