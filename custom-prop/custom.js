"use strict";

// check for saved 'darkTheme' in localStorage
// fires only when page loads

// variable is set to whatever is was on page load, localStorage is switching
// >> variable updated in the eventListener
let darkMode = localStorage.getItem("darkMode");

// dark-light switch
const themeSwitch = document.querySelector(".checkbox");

// --- STEPS

// check if dark mode is enables
// >> if it is enabled, turn it off
// >> if it is disabled, turn it on

// --- FUNCTIONS

const enableDarkMode = () => {
  // 1. add class .darkTheme to the body
  document.body.classList.add("darkmode");

  // 2. update darkTheme in the localStorage
  // storing object/key-value pairs to localStorage
  // setItem(keyValue, keyName)
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

// --- LOCAL STORAGE INFO
// checks if darkMode was enabled on the previous page visit
// stays in the last mode you chose

if (darkMode === "enabled") {
  enableDarkMode();
}

// --- EVENT LISTENER

themeSwitch.addEventListener("change", () => {
  // --- without localStorage:
  // document.body.classList.toggle("dark-theme");

  // --- with localStorage:
  // 1. update darkMode variable every time someone clicks on toggle button
  darkMode = localStorage.getItem("darkMode");

  // 2. check if darkTheme is enabled, if it not, enable it
  if (darkMode !== "enabled") {
    enableDarkMode();
    console.log(darkMode);
  }
  // if it has been enabled, turn it off
  else {
    disableDarkMode();
    console.log(darkMode);
  }
});
