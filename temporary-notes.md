# Next:

<br><br>

**Take in account user's OS preference**

<br>

[YT prefers-color-scheme CSS only!](https://www.youtube.com/watch?v=_yCgeXFAXTM)
[YT prefers-color-scheme CSS + JS](https://www.youtube.com/watch?v=wodWDIdV9BY)

<br><br>

auto OS preference + manual toggle button

- [How to make a website light/dark toggle with CSS & JS](https://www.youtube.com/watch?v=wodWDIdV9BY)

- [Codepen example from previous video](https://codepen.io/kevinpowell/pen/EMdjOV)

<br><br>

**Refactor to SCSS**
<br>

https://stackoverflow.com/questions/65007216/prevent-duplication-of-css-custom-properties-when-using-prefers-color-scheme

<br>

[DRY principle](https://css-tricks.com/a-dry-approach-to-color-themes-in-css/)

<br><br>

**LOGO dark/light toggle**

- https://michaelti.ca/sandbox/2020/05/01/dark-mode-images-with-a-manual-toggle-switch/
  <br><br>

  // select all "source" elements where the parent is a "picture", where "source" elements contain attribute media containing "(prefers-color-scheme: ${colorScheme})"

          `picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`

<br><br>

[StackOverflow inspo for the solution]
(https://stackoverflow.com/questions/71013868/switch-logo-color-in-dark-mode-issue)

<br><br>

[CSS custom properties series](https://www.youtube.com/watch?v=PHO6TBq_auI&list=PL4-IK0AVhVjOT2KBB5TSbD77OmfHvtqUi&index=2)
