
const setUpBackground = (waterColor) => {
  const background = document.getElementById('background');
  background.addEventListener('load', () => {
    waterColor.ctx.drawImage(background, 0, 0, 1000, 600);
  });

  const images = document.querySelectorAll('.options > *');
  images.forEach((image) => {
    image.addEventListener('click', (e) => {
      //TODO clear function should confirm and return boolean
      if (window.confirm("Are you sure? All the things on the canvas will be gone!")) {
        waterColor.clear();
        background.setAttribute('src', e.target.src);
        waterColor.night = e.target.classList[0] === 'night';
      }
    });
  });

};

const setUpDownload = (waterColor) => {
  let download = document.getElementById('save');
  download.addEventListener('click', () => {
    download.setAttribute('href', waterColor.canvas.toDataURL('png'));
  });
};

export { setUpBackground, setUpDownload };
