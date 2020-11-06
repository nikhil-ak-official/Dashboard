/*---------------- Hamburger menu setup -------------------*/
const hamburger = document.querySelector(".mobile-hamburger");
const welcome = document.querySelector(".side-panel");
const burgerLines = document.querySelectorAll(".line");

hamburger.addEventListener("click", () => {
  welcome.classList.toggle("open");
  burgerLines.forEach((line) => {
    line.classList.toggle("line-dark");
  });
});