// sessionStorage
// form validation

"use strict";

const themeSwitch = document.querySelector(".checkbox");
const favicon = document.getElementById("favicon");

// Check for dark mode OS preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Favicon change
const changeFavicon = () => {
  if (prefersDarkScheme.matches) {
    favicon.href = "./assets/dark-fav.ico";
  } else {
    favicon.href = "./assets/light-fav.ico";
  }
};

changeFavicon();

prefersDarkScheme.addEventListener("change", changeFavicon);

// --- LOCAL STORAGE INFO

// User'S theme preference from localStorage, if available
let currentTheme = sessionStorage.getItem("theme");

// If preference in sessionStorage is dark...
if (currentTheme === "dark") {
  // toggle .dark-theme class on the :root
  document.documentElement.classList.toggle("dark-theme");

  // If preference in sessionStorage is light...
} else if (currentTheme === "light") {
  // toggle .light-theme class on the :root
  document.documentElement.classList.toggle("light-theme");
}

// --- EVENT LISTENER

themeSwitch.addEventListener("change", () => {
  let theme;

  // If OS setting is dark + matches .dark-theme class...
  if (prefersDarkScheme.matches) {
    // toggle the light mode class
    document.documentElement.classList.toggle("light-theme");

    // use .dark-mode if the .light-mode class is already on the :root/html
    theme = document.documentElement.classList.contains("light-theme")
      ? "light"
      : "dark";
  }

  // else do the same thing for .dark-mode
  else {
    document.documentElement.classList.toggle("dark-theme");

    theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  }

  // save current preference to sessionStorage to keep using it
  sessionStorage.clear();
});

//

// --- FORM VALIDATION
// add customizable error message with Constraint validation API

const form = document.getElementsByTagName("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", function (event) {
  // Each time the user types, check if the form fields are valid

  if (email.validity.valid) {
    // If there is an error message visible, if the field is valid, remove the error message
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", function (event) {
  // if the email field is valid, we let the form submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty, display error msg
    emailError.textContent = "Please, enter an e-mail address.";
  }
  // If the field input doesn't contain an email address, display error msg
  else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered input needs to be an e-mail address.";
  }
  // If the data is too short,ndisplay error msg
  else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = "error active";
}
