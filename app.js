const hambugerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();
const body = document.body;

hambugerMenu.addEventListener("click", () => {
  hambugerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
});
