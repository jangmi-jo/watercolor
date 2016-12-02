import PathGenerator from './path_generator.js';
import preloaded from './preloaded.js';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext("2d");
  let pathGenerator = new PathGenerator(canvas, ctx);
  let background = document.getElementById('background');
  background.addEventListener('load', () => {
    ctx.drawImage(background, 0, 0, 1000, 600);
  });

  const changeBackGround = (e) => {
    if (window.confirm("Are you sure? All the things on the canvas will be gone!")) {
      clearExample();
      pathGenerator.clear();
      background.setAttribute('src', e.target.src);
      background.addEventListener('load', () => {
        ctx.drawImage(background, 0, 0, 1000, 600);
      });
    }
  };

  let images = document.querySelectorAll('.options > *');
  images.forEach((i) => {
    i.addEventListener('click', changeBackGround);
  });

  window.screenshot = () => {
    let d = document.getElementById('download');
    d.setAttribute('href', canvas.toDataURL('png'));
  };

  let i = 0;
  let preloadedProcess = () => {
    let move = new MouseEvent('mousemove', {
      button: 0, buttons: 1,
      clientX: preloaded[i][0], clientY: preloaded[i][1]});
    canvas.dispatchEvent(move);
    i += 1;
    if (i === preloaded.length - 1) {
      window.clearInterval(interval);
    }
  };

  let clearExample = (e) => {
    window.clearInterval(interval);
    clearButton.removeEventListener('click', clearExample);
  };
  let interval = window.setInterval(preloadedProcess, 10);
  let clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', clearExample);
});
