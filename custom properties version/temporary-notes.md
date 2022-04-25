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

https://piccalil.li/tutorial/create-a-user-controlled-dark-or-light-mode/

https://blog.appnation.co/how-to-set-a-dark-mode-app-icon-for-your-app-cc143d56f100

https://www.tech-wiki.online/en/dark-mode-favicon.html

https://medium.com/geekculture/how-to-toggle-between-light-dark-mode-7efcb48d6211

https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/

with `prefers-color-scheme` ?

<br><br>

3. take in account user's OS preference

<br><br>

4. Refactor to SCSS
