const TimerManager = {
  timer: null,
  taskId: null,

  set: (taskId) => {
    TimerManager.taskId = taskId;
  },

  clear: () => {
    TimerManager.taskId = null;
  },

  isDoing: () => Boolean(TimerManager.taskId),

  getDoingTaskId: () => TimerManager.taskId,

  getProgressTime: (taskDom) => {
    // 開始時刻を取得
    console.log(taskDom.dataset.start_date);
    const progress = parseInt(taskDom.dataset.progress || 0, 10);
    const diffTime = TimerManager.calcActualTime(taskDom.dataset.start_date);
    return diffTime + progress;
  },

  displayTimer: (taskDom) => {
    // すでにある時間に加算
    const progressTime = TimerManager.getProgressTime(taskDom);
    // 表示
    const displayAreas = taskDom.querySelectorAll('.actual_sec');
    displayAreas.forEach((displayArea) => {
      displayArea.textContent = TimerManager.convert_hms_from_seconds(progressTime);
    });
  },

  convert_hms_from_seconds: (seconds) => {
    let argvSec = seconds;
    let hour = Math.floor(argvSec / (60 * 60));
    argvSec -= hour * (60 * 60);

    if (hour < 10) hour = ['0', hour].join('');

    let min = Math.floor(argvSec / 60);
    argvSec -= min * 60;
    if (min < 10) min = ['0', min].join('');

    let sec = Math.floor(argvSec);
    if (sec < 10) sec = ['0', sec].join('');

    return [hour, ':', min, ':', sec].join('');
  },

  calcActualTime: (startDate) => {
    const start = new Date(startDate || Date());
    const now = new Date();

    const diffMilliSeconds = now.getTime() - start.getTime();
    console.log('calcActualTime:', start, diffMilliSeconds / 1000);
    return diffMilliSeconds / 1000;
  },

  // 時間管理を始める関数
  watch: () => {
    TimerManager.timer = setInterval(() => {
      if (TimerManager.taskId) {
        console.log(TimerManager.taskId);
        TimerManager.displayTimer(document.getElementById(TimerManager.taskId));
      }
    }, 200);
  },
};

export default TimerManager;
