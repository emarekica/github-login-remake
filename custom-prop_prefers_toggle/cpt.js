// with sessionStorage

"use strict";

const themeSwitch = document.querySelector(".checkbox");

// Check for dark mode OS preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Get user's theme preference from localStorage, if it's available
let currentTheme = sessionStorage.getItem("theme");
console.log(currentTheme);

// --- LOCAL STORAGE INFO

// If the user's preference in sessionStorage is dark...
if (currentTheme === "dark") {
  // toggle .dark-theme class on the :root
  document.documentElement.classList.toggle("dark-theme");
  // console.log("Local storage theme is DARK!");

  // Otherwise, if the user's preference in sessionStorage is light...
} else if (currentTheme === "light") {
  // toggle .light-theme class on the :root
  document.documentElement.classList.toggle("light-theme");
}

// --- EVENT LISTENER

themeSwitch.addEventListener("change", () => {
  let theme;

  // If the user's OS setting is dark and matches .dark-theme class...
  if (prefersDarkScheme.matches) {
    // toggle the light mode class
    document.documentElement.classList.toggle("light-theme");

    // use .dark-mode if the .light-mode class is already on the :root/html
    theme = document.documentElement.classList.contains("light-theme")
      ? "light"
      : "dark";
  }

  // otherwise, do the same thing, but for .dark-mode
  else {
    document.documentElement.classList.toggle("dark-theme");
    theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  }

  // save the current preference to sessionStorage to keep using it
  sessionStorage.clear();
});