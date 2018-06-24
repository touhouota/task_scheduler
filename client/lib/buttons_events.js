import ModalProcess from './modal_process';
import Base from './base_object';

const Buttons = {
  append_task: () => {
    ModalProcess.showModal();
  },

  members: () => {
    console.log('members_status');
    ModalProcess.init();
    const membersTask = document.querySelector('.members_status');
    membersTask.classList.remove('hide');
    ModalProcess.getModalBack().addEventListener('click', () => {
      membersTask.classList.add('hide');
    });
  },

  github: () => {
    const URL = 'https://github.com/touhouota/task_scheduler/issues';
    window.open(URL, '_blank');
  },
};

export default Buttons;
