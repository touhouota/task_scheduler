const Plan = {
  // 時間からHTML内の要素の位置を取得
  getAbsolutePosition(time) {
    // 入力された文字列が時間でない場合を弾く
    if (!time.match(/^\d{1,2}:\d{2}$/)) {
      return null;
    }

    const table = document.querySelector('.timeline');
    const timeList = table.querySelectorAll('.times');
    let i = 0;
    const size = timeList.length;

    for (i = 0; i < size; i += 1) {
      const upper = timeList[i];
      const lower = timeList[i + 1];
      if (upper.dataset.time <= time && time < lower.dataset.time) {
        return upper;
      }
    }
    return null;
  },

  // 開始、終了の時間をもらい、表示位置とサイズの情報を返す
  // in: 00:30:00, 01:30:00
  // out {
  //     top: ---,
  //     buttom:____
  // }
  positionSetting(start, finish) {
    const startArea = this.getAbsolutePosition(start);
    const finishArea = this.getAbsolutePosition(finish);

    // positionが取得できていない場合はnullを返す
    if (!startArea || !finishArea) {
      return null;
    }

    // 開始時間と終了時間の大小関係がおかしい
    if (startArea.dataset.time >= finishArea.dataset.time) {
      return null;
    }

    return {
      top: startArea.offsetTop,
      height: finishArea.offsetTop - startArea.offsetTop,
    };
  },

  // 予定を追加する関数
  appendPlan(name, start, finish) {
    const template = document.getElementById('plan_template');
    const plan = document.importNode(template.content, true);

    plan.querySelector('.plan_name').textContent = name;
    plan.querySelector('.start').textContent = start;
    plan.querySelector('.finish').textContent = finish;

    const position = this.positionSetting(start, finish);
    console.log('appendPlan', position);
    // 位置を取得できなければここで終わる。
    if (!position) {
      alert('位置を取得できない');
      return false;
    }

    const planElement = plan.firstElementChild;
    console.log(position, plan);
    planElement.style.top = `${position.top}px`;
    planElement.style.height = `${position.height}px`;

    const planArea = document.getElementById('plan_container');
    planArea.appendChild(plan);
    return true;
  },

  // 今時間のところに、線を引く
  currentTimeLine() {
    const now = new Date();
    // 分単位でずらすため、１日の中で何分経ったかを取得
    const linePosition = (now.getHours() * 60) + now.getMinutes();

    // タイムラインの大きさをもとに、1分あたりの大きさを取得
    const scale = document.querySelector('.timeline').offsetHeight / (24 * 60);
    const currentLine = document.getElementById('current_line');
    currentLine.style.top = `${scale * linePosition}px`;
  },

};

export default Plan;
