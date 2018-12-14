import ModalProcess from './modal_process';
import Base from './base_object';

const Buttons = {
  appendTask: () => {
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

  reflection: () => {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    window.location.href = `${path}/reflection/individual/${userId}`;
  },

  checklist: () => {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    window.location.href = `${path}/report/list/${userId}`;
  },

  github: () => {
    const URL = 'https://github.com/touhouota/task_scheduler/issues';
    window.open(URL, '_blank');
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

  taskList: () => {
    const path = Base.get_path();
    const userId = Base.get_cookie('user_id');
    window.location.href = `${path}/structure/main/${userId}`;
  },
};

export default Buttons;
