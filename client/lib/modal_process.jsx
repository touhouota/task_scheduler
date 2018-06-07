import Base from './base_object';

const ModalProcess = {
  init: (modalClass) => {
    console.log('ModalProcess', modalClass);
    const background = document.createElement('div');
    background.addEventListener('click', () => {
      ModalProcess.close(modalClass);
    });
    background.classList.add('modal_back');
    document.body.appendChild(background);
    // modalを表示
    // document.getElementById('modal_area').classList.remove('hide');
    document.querySelector(`.${modalClass}_modal`).classList.remove('hide');
  },

  close: (modalClass) => {
    const modalBack = document.querySelector('.modal_back');
    document.body.removeChild(modalBack);
    // modalを非表示
    // document.getElementById('modal_area').classList.add('hide');
    document.querySelector(`.${modalClass}_modal`).classList.add('hide');
    document.querySelector('.modal').reset();
  },

  getModalData: (formElement) => {
    const formdata = Base.createFormData(formElement);
    formdata.append('authenticity_token', Base.get_token());
    return formdata;
  },
};

export default ModalProcess;
