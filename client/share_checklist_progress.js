import Base from './lib/base_object';
import Buttons from './lib/buttons_events';

const setCheckNum = () => {
  const userId = Base.get_cookie('user_id');
  const path = `${Base.get_path()}//api/checklist/check_num/${userId}`;
  fetch(path)
    .then(res => res.json())
    .then((json) => {
      const list = document.querySelector(`.${Base.get_cookie('user_id')}`);
      // const length = json.length;
      for (let key in json) {
        list.querySelector(`.${key} > `).textContent = json[key];
      }
    })
}

window.onload = () => {
  document.getElementById('task_list').addEventListener('click', Buttons.taskList);
  document.getElementById('week_reflection').addEventListener('click', Buttons.reflection);
  document.getElementById('github').addEventListener('click', Buttons.github);
  document.getElementById('logout').addEventListener('click', Buttons.logout);

  setCheckNum();
};