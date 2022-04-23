"use strict";

const themeSwitch = document.querySelector(".checkbox");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});
