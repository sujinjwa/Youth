"use strict";

var hamburgButton = document.querySelector(".bar");
var icon = hamburgButton.querySelector("i");
var modal = document.querySelector(".modal");
var modalBtn2 = modal.querySelector("button");
var body = document.querySelector("body");

var openModal = function openModal() {
  modal.classList.remove("hidden");
  body.classList.add("openModal");
};

var closeModal = function closeModal() {
  modal.classList.add("hidden");
  body.classList.remove("openModal");
};

hamburgButton.addEventListener("click", openModal);
modalBtn2.addEventListener("click", closeModal);