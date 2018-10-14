import ReflectionPage from './lib/reflection_page';
import Buttons from './lib/buttons_events';

let resizeTimer;

window.onload = () => {
  // グラフ描画処理
  ReflectionPage.drawPage('graph');

  // 画面サイズ変更イベント
  resizeTimer = 0;
  window.addEventListener('resize', () => {
    if (resizeTimer > 0) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      ReflectionPage.redraw();
    });
  });

  // 画面上部のボタンに対する処理
  document.getElementById('task_list').addEventListener('click', Buttons.taskList);
  document.getElementById('github').addEventListener('click', Buttons.github);
  document.getElementById('logout').addEventListener('click', Buttons.logout);
};
