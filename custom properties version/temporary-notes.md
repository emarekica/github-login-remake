# Next:

<br><br>

1. CSS tidy ups:
   <br>

- switch px >> em
- check for doubles
- alphabetical order

<br><br>

2. LOGO dark/light toggle

- https://michaelti.ca/sandbox/2020/05/01/dark-mode-images-with-a-manual-toggle-switch/
  <br><br>

  // select all "source" elements where the parent is a "picture", where "source" elements contain attribute media containing "(prefers-color-scheme: ${colorScheme})"

          `picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`

<br><br>

[StackOverflow inspo for the solution]
(https://stackoverflow.com/questions/71013868/switch-logo-color-in-dark-mode-issue)

<br><br>

3. take in account user's OS preference

<br><br>

4. Refactor to SCSS
