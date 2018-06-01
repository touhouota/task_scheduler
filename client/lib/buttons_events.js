import ModalProcess from './modal_process';
import Base from './base_object';

const Buttons = {
  github: () => {
    const URL = 'https://github.com/touhouota/task_scheduler/issues';
    window.open(URL, '_blank');
  },

  append_task: () => {
    ModalProcess.init();
  },

  logout: () => {
    const path = Base.get_path();
    fetch(`${path}/api/logout`);
  },
};

export default Buttons;
