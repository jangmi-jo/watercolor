import PathGenerator from './path_generator.js';
import preloaded from './preloaded.js';


document.addEventListener('DOMContentLoaded', () => {
  let pathGenerator = new PathGenerator();
  let canvas = document.getElementById('canvas');
  canvas.setAttribute('style', 'background-image: url(https://res.cloudinary.com/wkdal720/image/upload/v1473858517/watercolor/1_dkzdfo.jpg)');
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
