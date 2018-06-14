import Base from './base_object';

const ModalProcess = {
  init: () => {
    const background = document.createElement('div');
    background.addEventListener('click', ModalProcess.close);
    background.classList.add('modal_back');
    document.body.appendChild(background);
  },

  close: () => {
    const modalBack = document.querySelector('.modal_back');
    document.body.removeChild(modalBack);
    // modalを非表示
    document.getElementById('modal_area').classList.add('hide');
    document.querySelector('.modal').reset();
  },

  showModal: () => {
    ModalProcess.init();
    // modalを表示
    document.getElementById('modal_area').classList.remove('hide');
  },

  getModalData: (formElement) => {
    // const form = document.querySelector('.modal');
    const formdata = new FormData(formElement);
    // formdata.append('user_id', Base.get_cookie('user_id'));
    formdata.append('authenticity_token', Base.get_token());
    return formdata;
  },
};

export default ModalProcess;
