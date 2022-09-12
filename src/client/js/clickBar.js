const hamburgButton = document.querySelector(".bar");
const icon = hamburgButton.querySelector("i");
const modal = document.querySelector(".modal");
const modalBtn2 = modal.querySelector("button");
const body = document.querySelector("body");

const openModal = function () {
  modal.classList.remove("hidden");
  body.classList.add("openModal");
};

const closeModal = function () {
  modal.classList.add("hidden");
  body.classList.remove("openModal");
};

hamburgButton.addEventListener("click", openModal);
modalBtn2.addEventListener("click", closeModal);
