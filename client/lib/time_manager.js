const TimerManager = {
  timer: null,
  tasks: [],

  displayTimer(taskDom) {
    // すでにある時間に加算
    const diffTime = calcActualTime();
    // 表示
    const displayArea = taskDom.querySelector(".actual_sec");
    const nowSecond = parseInt(displayArea.textContent, 10);
    displayArea.textContent = nowSecond + diffTime;
  }

  calcActualTime(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    const diffMilliSeconds = now.getTime() - start;
    return diffMilliSeconds / 1000;
  }

  // 時間管理を始める関数
  watch: () => {
    this.timer = setInterval(() => {
      const id = this.tasks.find(taskId => document.getElementById(taskId).dataset.status === '2');
      this.displayTimer(document.getElementById(id));
    }, 1000);
  },
};
