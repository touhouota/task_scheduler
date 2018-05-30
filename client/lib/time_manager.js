const TimerManager = {
  timer: null,
  taskId: null,

  set: (taskId) => {
    TimerManager.taskId = taskId;
  },

  clear: () => {
    TimerManager.taskId = null;
  },

  displayTimer: (taskDom) => {
    // すでにある時間に加算
    console.log(taskDom.dataset.start_date);
    const diffTime = TimerManager.calcActualTime(taskDom.dataset.start_date);
    // 表示
    const displayArea = taskDom.querySelector('.actual_sec');
    const progress = parseInt(taskDom.dataset.progress || 0, 10);
    displayArea.textContent = progress + diffTime;
  },

  calcActualTime: (startDate) => {
    const start = new Date(startDate);
    const now = new Date();

    const diffMilliSeconds = now.getTime() - start;
    return diffMilliSeconds / 1000;
  },

  // 時間管理を始める関数
  watch: () => {
    TimerManager.timer = setInterval(() => {
      if (TimerManager.taskId) {
        console.log(TimerManager.taskId);
        TimerManager.displayTimer(document.getElementById(TimerManager.taskId));
      }
    }, 1000);
  },
};

export default TimerManager;
