import Base from './lib/base_object';
import Buttons from './lib/buttons_events';

const checkFullChecked = (record) => {
  const target = Base.parents(record.pop().target, 'column');
  console.log('target', target);
  const checked = target.querySelector('.num').textContent;
  const total = target.querySelector('.total').textContent;
  console.log(checked, total);
  if (checked === total) target.classList.add('fulled');
};

const changeWatcher = new MutationObserver(checkFullChecked);


const setCheckNum = () => {
  const userId = Base.get_cookie('user_id');
  const path = `${Base.get_path()}/api/checklist/check_num/${userId}`;
  fetch(path)
    .then(res => res.json())
    .then((json) => {
      const list = document.querySelector(`.${Base.get_cookie('user_id')}`);
      for (let key in json) {
        console.table(json);
        let target = list.querySelector(`.${key} > .num`);
        changeWatcher.observe(target, {
          childList: true,
          subtree: true,
        });
        target.textContent = json[key];
      }
    });
};

window.onload = () => {
  document.getElementById('task_list').addEventListener('click', Buttons.taskList);
  document.getElementById('week_reflection').addEventListener('click', Buttons.reflection);
  document.getElementById('github').addEventListener('click', Buttons.github);
  document.getElementById('logout').addEventListener('click', Buttons.logout);

  setCheckNum();
};