# Next:

<br><br>

**Authentication**
<br>

**HTML form validation**

<br>

1: **Built-in form validation**
<br>

- [MDN Client side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

- [W3Schools HTML Input attributes](https://www.w3schools.com/html/html_form_attributes.asp)

- [HTML form validation](https://www.educba.com/html-form-validation/)

- [HTML5 form validation examples](https://www.the-art-of-web.com/html/html5-form-validation/)

- [The Complete Guide to HTML Forms and Constraint Validation](https://www.sitepoint.com/html-forms-constraint-validation-complete-guide/)

- [YT: HTML form validation](https://www.youtube.com/watch?v=eUkDdEwUgjs)

<br><br>

2: **JS form validation**
<br>

- [W3Schools JS form validation](https://www.w3schools.com/js/js_validation.asp)

- [JavaScript Form Validation With Limit Login Attempts](https://www.formget.com/javascript-login-form/)

- [Data Validation – How to Check User Input on HTML Forms with Example JavaScript Code](https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/)

- [YT: JS form validation](https://www.youtube.com/watch?v=In0nB0ABaUk)

- [YT: Validate Form Using JavaScript](https://www.youtube.com/watch?v=fz8bwvn9lA4)

<br><br>

- [Form validation using HTML and JavaScript](https://www.geeksforgeeks.org/form-validation-using-html-javascript/)

<br>

**Input validation**

- [Input validation - min/max length](https://riptutorial.com/html/example/2259/input-validation)

<br>

---

VALIDATION vs AUTHENTICATION

<br>

**AUTHENTICATION vs AUTHORIZATION**
<br><br>

**Authentication** is the process of verifying who someone is.

- works through passwords, one-time pins, biometric information, and other information provided or entered by the user

- first step of a good identity and access management process

- visible to and partially changeable by the user
  <br><br>

**Example**: By verifying their identity, employees can gain access to an HR application that includes their personal pay information, vacation time, and 401K data.

<br>

**Authorization** is the process of verifying what specific applications, files, and data a user has access to.

- determines what resources a user can access

- works through settings that are implemented and maintained by the organization

- always takes place after authentication

- isn’t visible to or changeable by the user.

<br><br>

**Example**: Once their level of access is authorized, employees and HR managers can access different levels of data based on the permissions set by the organization.

<br>

[Authentication vs. Authorization](https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization)

---

<br>

- [YT: Privatnost i podaci o korisniku](https://www.youtube.com/watch?v=CqwdewDb9g8&list=PLmGRn_VnTuAxIHKjfgoOEOIk72PeZdbaB&index=100)

- [YT: User password authentication (Node.js + Express)](https://www.youtube.com/watch?v=Nlg0JrUt0qg&list=PLmGRn_VnTuAxIHKjfgoOEOIk72PeZdbaB&index=67)

<br><br>

**Refactor to SCSS**
<br><br>

- [SASS/SCSS official guide](https://sass-lang.com/guide)

- [YT: Example of SCSS code with dark/light mode](https://www.youtube.com/watch?v=py3W80hMuzE&list=PLmGRn_VnTuAxIHKjfgoOEOIk72PeZdbaB&index=102)

- [stackOverflow: custom properties duplication prevention](https://stackoverflow.com/questions/65007216prevent-duplication-of-css-custom-properties-when-using-prefers-color-scheme)

- [Create a color theme mixin with SASS](https://www.youtube.com/watch?v=EKHd0Dcc4IY&list=WL&index=13&t=17s)

<br><br>

**LOGO dark/light toggle**
<br><br>

- https://michaelti.ca/sandbox/2020/05/01/dark-mode-images-with-a-manual-toggle-switch/
  <br><br>

Select all `source` elements where the parent is a `picture`, where `source` elements contain attribute media containing `(prefers-color-scheme: ${colorScheme})`.
<br>

          `picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`

<br><br>

- [StackOverflow inspo for the solution](https://stackoverflow.com/questions/71013868/switch-logo-color-in-dark-mode-issue)

<br>

- [YT: CSS custom properties series](https://www.youtube.com/watch?v=PHO6TBq_auI&list=PL4-IK0AVhVjOT2KBB5TSbD77OmfHvtqUi&index=2)

<br><br>

**Take in account user's OS preference**

<br>

- [YT: prefers-color-scheme CSS only!](https://www.youtube.com/watch?v=_yCgeXFAXTM)

<br><br>

auto OS preference + manual toggle button

- [YT: How to make a website light/dark toggle with CSS & JS](https://www.youtube.com/watch?v=wodWDIdV9BY)

- [Codepen example from previous video](https://codepen.io/kevinpowell/pen/EMdjOV)

<br><br>

- [localStorage guide](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
