
const setUpBackground = (waterColor) => {
  const background = document.getElementById('background');
  background.addEventListener('load', () => {
    waterColor.ctx.drawImage(background, 0, 0, 1000, 600);
  });

  const images = document.querySelectorAll('.options > *');
  images.forEach((image) => {
    image.addEventListener('click', (e) => {
      if (waterColor.clear()) {
        background.setAttribute('src', e.target.src);
        waterColor.night = e.target.classList[0] === 'night';
      }
    });
  });
};

export default setUpBackground;
