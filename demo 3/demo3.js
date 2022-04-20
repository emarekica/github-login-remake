// "use strict";

const themeSwitch = document.querySelector("input");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});

// resource: https://academind.com/tutorials/adding-dark-mode
