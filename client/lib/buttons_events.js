import ModalProcess from './modal';

const Buttons = {
  github: () => {
    const URL = 'https://github.com/touhouota/task_scheduler/issues';
    window.open(URL, '_blank');
  },

  append_task: () => {
    ModalProcess.init();
  },
};

export default Buttons;
