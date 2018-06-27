const Base = {
  finish_status: [2, 3],

  // Safari用、フォーム情報をオブジェクトに直す
  form_element_to_object: (form) => {
    const inputs = form.querySelectorAll('input, select, textarea');
    const array = [].slice.call(inputs);
    const array_length = array.length;
    const formdata = {};
    for (let i = 0; i < array_length; i++) {
      formdata[array[i].name] = array[i].value;
    }

    return formdata;
  },

  createFormData: (formElement) => {
    let formData;
    if (formElement) {
      formData = new FormData(formElement);
    } else {
      formData = new FormData();
    }

    // formData.append('user_id', Base.get_cookie('user_id'));
    return formData;
  },

  // subディレクトリで動かすので、pathに関してsubディレクトリを返す
  get_path: () => {
    const path = location.pathname.split('/');
    while (path.length > 3) {
      path.pop();
    }

    return path.join('/');
  },

  get_token: () => document.querySelector('[name=csrf-token]').content,

  // クッキーをオブジェクトに直すもの
  get_cookie: (property) => {
    const result = {};
    const all = document.cookie;
    if (all.length !== 0) {
      const cookies = all.split(';');
      const length = cookies.length;
      for (let i = 0; i < length; i++) {
        const cookie = cookies[i].split('=');
        // console.log(cookie);
        if (cookie[1].length !== 0) {
          result[cookie[0].trim()] = cookie[1];
        } else {
          result[cookie[0].trim()] = null;
        }
      }
    }

    if (property) {
      // 引数があるとき
      if (result[property]) {
        // cookieの中に引数のものがあれば返す
        return result[property];
      }
      // なければnull
      return null;
    }
    // 引数がない時は、cookieのobjectを返す
    return result;
  },

  parents: (dom, selector) => {
    const parent = [];
    let target = dom;
    if (dom.classList.contains(selector)) return dom;
    while (target.parentElement) {
      target = target.parentElement;
      // console.log(target);
      if (target.classList.contains(selector)) {
        return target;
      }
      parent.push(target);
    }
    return parent;
  },

  // ///////////////////////////
  // 指定した要素の祖先要素を返す関数
  // クラス名を指定した場合、あればその要素を返す
  // なければ、祖先要素を含んだ配列を返す
  // ///////////////////////////

  // 特定のあたい(num)を少数第at位で四捨五入する
  round_at: (num, at) => {
    const pow_num = Math.pow(10, Number(at));
    const input_num = Number(num);
    return Math.round(input_num * pow_num) / pow_num;
  },

  format_ymd: (date) => {
    const year = date.getFullYear();
    // 3月 => 003となる中で、末尾から２文字をmonthとする
    const month = (`00${date.getMonth() + 1}`).slice(-2);
    const day = (`00${date.getDate()}`).slice(-2);

    return [year, month, day].join('-');
  },

  format_hms: date =>
    // toTimeString: 14:39:07 GMT-0600 (PDT)という形式
    date.toTimeString().split(' ').shift(),

};

export default Base;
