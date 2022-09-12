const message = document.querySelector(".coreMessage");
// blog__post인 3개의 element를 array로 불러와서 animation 적용하기

const showMessage = () => {
  viewHeight = message.getBoundingClientRect().top;
  if (viewHeight <= 670) {
    message.classList.add("show");
    message.classList.add("slide-top");
  }

  if (viewHeight >= 800) {
    message.classList.remove("show");
    message.classList.remove("slide-top");
  }
};

window.addEventListener("scroll", showMessage);
