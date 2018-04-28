const ModalProcess = {
  init: () => {
    const background = document.createElement('div');
    background.addEventListener('click', ModalProcess.close);
    background.classList.add('modal_back');
    document.body.appendChild(background);
    // modalを表示
    document.getElementById('modal_area').classList.remove('hide');
  },

  close: () => {
    const modalBack = document.querySelector('.modal_back');
    document.body.removeChild(modalBack);
    // modalを非表示
    document.getElementById('modal_area').classList.add('hide');
  },

  send: () => {
    console.log('send form information');
    ModalProcess.close();
  },
};

export default ModalProcess;
