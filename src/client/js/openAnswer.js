const heading = document.querySelectorAll(".panel-heading");
const answer = document.querySelectorAll(".panel-body");
const question = document.querySelectorAll(".panel-question");

const openAnswer = (event) => {
  for (var i = 0; i < question.length; i++) {
    var q = event.target.parentNode;
    if (
      q == question[i] ||
      q.parentNode == question[i] ||
      q.parentNode.parentNode == question[i]
    ) {
      question[i].classList.toggle("clicked");
    }

    if (question[i].classList.contains("clicked")) {
      var icon = question[i].querySelector("div>div>h3>i");
      icon.className = "fa-solid fa-angle-up";
    } else {
      var icon = question[i].querySelector("div>div>h3>i");
      icon.className = "fa-solid fa-angle-down";
    }
  }
};

for (var i = 0; i < heading.length; i++) {
  heading[i].addEventListener("click", openAnswer);
}
