import Base from './lib/base_object';

const getList = () => {
  const userId = Base.get_cookie('user_id');
  const path = `${Base.get_path()}/api/checklist/confirm/${userId}`;
  console.log(path);

  fetch(path)
    .then(res => res.json())
    .then((json) => {
      console.log(json);
      json.forEach((item) => {
        console.log(item);
        const check = document.querySelector(`input[name=${item.box_name}]`);
        check.checked = true;
      });
    });
};

const clickEvent = (e) => {
  console.log(e.target);
  const checklistData = new FormData();
  checklistData.append('user_id', Base.get_cookie('user_id'));
  checklistData.append('box_name', e.target.name);

  const path = `${Base.get_path()}/api/checklist/update`;
  fetch(path, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': Base.get_token(),
    },
    credentials: 'same-origin',
    body: checklistData,
  });
};

window.onload = () => {
  getList();

  const boxes = document.querySelectorAll('input[type=checkbox]');
  let index = 0;
  const boxSize = boxes.length;
  for (; index < boxSize; index += 1) {
    boxes[index].addEventListener('click', clickEvent);
  }
};
