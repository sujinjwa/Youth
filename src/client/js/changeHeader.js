const header = document.querySelector("header");
const main = document.querySelector("main");
const modalBtn = document.querySelector(".modal>button");

const changeHeader = function () {
  let mainHeight = main.getBoundingClientRect().top;
  if (mainHeight < 0) {
    header.classList.add("change");
    modalBtn.classList.add("moveUp");
  } else {
    header.classList.remove("change");
    modalBtn.classList.remove("moveUp");
  }
};

window.addEventListener("scroll", changeHeader);
