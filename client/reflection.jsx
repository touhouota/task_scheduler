import ReflectionPage from './lib/reflection_page';

let resizeTimer;

window.onload = () => {
  ReflectionPage.drawPage('graph');
  resizeTimer = 0;
  window.addEventListener('resize', () => {
    if (resizeTimer > 0) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      ReflectionPage.redraw();
    });
  });
};
