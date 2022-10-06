"use strict";

var toggle = document.querySelector(".toggle");
var indicator = document.querySelector(".indicator");
var span = document.querySelectorAll(".panel-body p span");
var h3 = document.querySelector(".container__toggle h3");

var clickToggle = function clickToggle() {
  toggle.classList.toggle("active");

  if (toggle.classList.contains("active")) {
    h3.innerText = "일상 용어 모드";
  } else {
    h3.innerText = "법률 용어 모드";
  }

  for (var i = 0; i < span.length; i++) {
    span[i].classList.toggle("toggle");
  }
};

toggle.addEventListener("click", clickToggle);