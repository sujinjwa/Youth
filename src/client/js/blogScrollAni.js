const blogPosts = document.querySelectorAll(".blog__post");

const blogAni = () => {
  for (var i = 0; i < blogPosts.length; i++) {
    height = blogPosts[i].getBoundingClientRect().top;
    if (height <= 675) {
      blogPosts[i].classList.add("show");
      blogPosts[i].classList.add("slide-top");
    }
    if (height > 870) {
      blogPosts[i].classList.remove("show");
      blogPosts[i].classList.remove("slide-top");
    }
  }
};

window.addEventListener("scroll", blogAni);
