"use strict";

const themeSwitch = document.querySelector("input");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});

// function myFunction() {
//   const element = document.body;
//   element.classList.toggle("dark-mode");
// }
