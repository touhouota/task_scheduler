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
    // cookieの削除
    const userId = Base.get_cookie('user_id');
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() - 2);
    const cookieString = [
      `user_id=${userId}`,
      `path=${Base.get_path()}`,
      `expires=${expires.toUTCString()}`,
    ];
    document.cookie = cookieString.join(';');
    const path = Base.get_path();
    window.location.href = `${path}`;
  },
};

export default Buttons;
