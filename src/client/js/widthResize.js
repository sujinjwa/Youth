const blogPost = document.querySelectorAll(".blog__post");

const changeOrderBlog = () => {
  var width = window.innerWidth; // event 함수 안에서 선언해야 변환된 width 구할 수 있음
  // console.log(width);
  if (width <= 770) {
    blogPost[0].classList.add("order");
    blogPost[2].classList.add("order");
  } else {
    blogPost[0].classList.remove("order");
    blogPost[2].classList.remove("order");
  }
};

window.addEventListener("resize", changeOrderBlog);
