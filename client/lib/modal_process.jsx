import Base from './base_object';

const ModalProcess = {
  init: () => {
    const background = document.createElement('div');
    background.addEventListener('click', ModalProcess.closeModal);
    background.classList.add('modal_back');
    document.body.appendChild(background);
  },

  backgroundClose: () => {
    const modalBack = document.querySelector('.modal_back');
    document.body.removeChild(modalBack);
  },

  closeModal: () => {
    ModalProcess.backgroundClose();
    // modalを非表示
    document.getElementById('modal_area').classList.add('hide');
    document.querySelector('.modal').reset();
  },

  showModal: () => {
    ModalProcess.init();
    // modalを表示
    document.getElementById('modal_area').classList.remove('hide');
  },

  getModalBack: () => document.querySelector('.modal_back'),

  getModalData: (formElement) => {
    // const form = document.querySelector('.modal');
    const formdata = new FormData(formElement);
    formdata.append('user_id', Base.get_cookie('user_id'));
    formdata.append('authenticity_token', Base.get_token());
    return formdata;
  },

  isModalOpen: () => Boolean(ModalProcess.getModalBack()),

};

export default ModalProcess;
