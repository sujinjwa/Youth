const circle1 = document.querySelector('.circle.first');
const circle2 = document.querySelector('.circle.second');
const circle3 = document.querySelector('.circle.third');
const circles = [circle1, circle2, circle3];

const scrollAni = () => {
  for (let circle = 0; circle < circles.length; circle++) {
    let height = circles[circle].getBoundingClientRect().top;
    if (height <= 590) {
      circles[circle].classList.add('show');
      circles[circle].classList.add('slide-top');
    }
    if (height > 953) {
      circles[circle].classList.remove('show');
      circles[circle].classList.remove('slide-top');
    }
  }
};

window.addEventListener('scroll', scrollAni);
