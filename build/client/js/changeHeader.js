"use strict";

var header = document.querySelector("header");
var main = document.querySelector("main");
var modalBtn = document.querySelector(".modal>button");

var changeHeader = function changeHeader() {
  var mainHeight = main.getBoundingClientRect().top;

  if (mainHeight < 0) {
    header.classList.add("change");
    modalBtn.classList.add("moveUp");
  } else {
    header.classList.remove("change");
    modalBtn.classList.remove("moveUp");
  }
};

window.addEventListener("scroll", changeHeader);