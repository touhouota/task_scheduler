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
    document.querySelector('.modal').reset();
  },

  getModalData: () => {
    const form = document.querySelector('.modal');
    return new FormData(form);
  },

  send: () => {
    console.log('send form information');
    const formData = ModalProcess.getModalData();
    const header = {
      Accept: 'application/json',
    };
    fetch('/api/task', {
      method: 'POST',
      header,
      body: formData,
    }).then((response) => {
      console.log(response.json());
    });
    ModalProcess.close();
  },
};

export default ModalProcess;
