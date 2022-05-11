# LIGHT / DARK MODE NOTES

<br>

Several approaches:

1. body class
2. separate stylesheets
3. [custom properties](https://piccalil.li/tutorial/getting-started-with-css-custom-properties/) (most popular)
4. server-side scripts

<br>

Can be combined.

<br><br>

## LIGHT / DARK MODE AT OS LEVEL

<br>
Many operating systems let users choose between light and dark themes directly in the system settings.
<br><br>

**This two ways will automatically "copy" the OS system preferences to the website. If OS is in dark mode, the website will also be in dark mode. And vice versa.**
<br><br>

### CSS only

<br>

CSS has a prefers-color-scheme media query which can be used to detect user’s system color scheme preferences. It can have three possible values: no preference, light and dark.
<br><br>

The prefers-color-scheme CSS media feature is used to detect if the user has requested a light or dark color theme.

The user might indicate this preference through an operating system setting (e.g. light or dark mode) or a user agent setting.
<br>

If a user has enabled dark mode from the system settings, they will get the dark mode styles by default. We don’t have to resort to JavaScript or server-side scripts to decide which mode to use.
**We don’t even need the button!**

[MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

<br><Bbr>

**Syntax**: `light` and `dark`

<br>

**Usage**:

<br>

HTML:

    <h1>This is a title</h1>

    <p>I am just a boring text, existing here solely for the purpose of this demo</p>

    <a href="#">I am a link</a>

<br><br>

CSS:

    body {
      color: #222;
      background: #fff;
      font: 100% system-ui;
    }
    a {
      color: #0033cc;
    }

    @media (prefers-color-scheme: dark) {
      body {
        color: #eee;
        background: #121212;
      }

      body a {
        color: #809fff;
      }
    }

<br><br>

### CSS + JS

<br>

The `Window` interface's `matchMedia()` method returns a new `MediaQueryList` object that can then be used to determine if the `document` matches the `media query` string, as well as to monitor the document to detect when it matches (or stops matching) that media query.
<br>

We can turn to JavaScript to detect the user’s preferred color scheme. This is a lot like the CSS method, only we’re using `matchedMedia()` to detect the user’s preference.
<br>

We can swap stylesheets instead like with CSS. This time, we link up both stylesheets and use the media query to determine which one is applied.
<br>

**Downside**: there will likely be a quick flash of the light theme as JavaScript is executed after the CSS.

<br><br>

[MDN matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
<br>

**Syntax**:

    mqList = window.matchMedia(mediaQueryString)

<br>

**Usage**:

<br>

HTML:

    <h1>This is a title</h1>

    <p>I am just a boring text, existing here solely for the purpose of this demo</p>

    <a href="#">I am a link</a>

<br><br>

CSS:

    body {
      background: #fff;
      font: 100% system-ui;
    }

    h1,
    p {
      color: #222;
    }

    body.dark-theme {
      background: #121212;
    }
    body.dark-theme h1,
    body.dark-theme p {
      color: #eee;
    }
    body.dark-theme a {
      color: #809fff;
    }

<br><br>

JS:

```js
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.remove("dark-theme");
}
```

<br><br>

---

<br>

## OVERRIDING OS LIGHT / DARK SETTINGS

<br>

Enabling user to manually toggle dark / light mode.
<br>

**in CSS**:

- define the custom properties for both themes

- wrap dark styles up in the `prefers-color-scheme` media query

- define a `.light-theme` class inside of that we can use to override the dark mode properties, should the user want to toggle between the two modes

<br>

    /* Default colors */

    body {
      --text-color: #222;
      --bkg-color: #fff;
    }

    /* Dark theme colors */

    body.dark-theme {
      --text-color: #eee;
      --bkg-color: #121212;
    }

    /* Styles for users who prefer dark mode at the OS level */

    @media (prefers-color-scheme: dark) {
      /* defaults to dark theme */
      body {
        --text-color: #eee;
        --bkg-color: #121212;
      }

      /* Override dark mode with light mode styles if the user decides to swap */

      body.light-theme {
        --text-color: #222;
        --bkg-color: #fff;
      }
    }

<br><br>

### Having a toggle button

<br>

**= respecting the OS color preference by default**

**= allowing the user to manually switch themes**

<br><br>

JS:

```js
// Listen for a click on the button
btn.addEventListener("click", function () {
  // If the OS is set to dark mode...
  if (prefersDarkScheme.matches) {
    // ...then apply the .light-theme class to override those styles
    document.body.classList.toggle("light-theme");

    // Otherwise...
  } else {
    // ...apply the .dark-theme class to override the default light styles
    document.body.classList.toggle("dark-theme");
  }
});
```

<br><br>

---

## STORING USER'S PREFERENCE

<br>

**How to carry it over when the user either visits another page on the site or reloads the current page.**

<br>

We need to save the user’s choice so that it will be applied consistently throughout the site and on subsequent visits. To do that, we can save the user’s choice to the localStorage when the theme is toggled.
(Also possible with Cookies + PHP = server side approach).
<br>

### Using localStorage

<br>

`Window.localStorage`
<br>

The `localStorage` read-only property of the `window` interface allows you to access a `Storage` object for the `Document`'s `origin`; the stored data is saved across browser sessions.

`localStorage` is similar to `sessionStorage`, except that while `localStorage` **data has no expiration time**, `sessionStorage` data gets cleared when the page session ends — that is, when the page is closed. (`localStorage` data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)
<br><br>

The keys and the values stored with `localStorage` are always in the UTF-16 DOMString format, which uses two bytes per character. As with objects, integer keys are automatically converted to strings.

<br>

`localStorage` **data is specific to the protocol of the document**. In particular, for a site loaded over HTTP (e.g., `http://example.com`), `localStorage` returns a different object than `localStorage` for the corresponding site loaded over HTTPS (e.g., `https://example.com`).

<br>

[MDN local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
<br><br>

**Use case**:

<br>

We have a script that saves the selected theme to `localStorage` when the toggle takes place. In other words, when the page is reloaded, the script fetches the choice from localStorage and applies it.
JavaScript is often executed after CSS, so this approach is prone to a _“flash of incorrect theme” (FOIT)_.
<br><br>

JS:

```js
// Select the button
const btn = document.querySelector(".btn-toggle");

// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

// If the current theme in localStorage is "dark"...
if (currentTheme == "dark") {
  // ...then use the .dark-theme class
  document.body.classList.add("dark-theme");
}

// Listen for a click on the button
btn.addEventListener("click", function () {
  // Toggle the .dark-theme class on each click
  document.body.classList.toggle("dark-theme");

  // Let's say the theme is equal to light
  let theme = "light";
  // If the body contains the .dark-theme class...
  if (document.body.classList.contains("dark-theme")) {
    // ...then let's make the theme dark
    theme = "dark";
  }

  // Then save the choice in localStorage
  localStorage.setItem("theme", theme);
});
```

<br><br>

---

<br>

## DEMO

<br>

**Combines everything**
<br>

1. Automatically load a dark or light theme **based on OS preferences**.

2. Allow the user to manually override their system preference with **toggle button**.

3. Maintains the user’s preferred theme on page reloads with **`localStorage`**.

<br><br>

---

<br>

## Design considerations

<br>

### IMAGES

<br>

Decrease the brightness and contrast a bit.
<br>

CSS `filter()`
<br>

    /* Apply the filter directly on the body tag */
    body.dark-theme img {
      filter: brightness(.8) contrast(1.2);
    }

    /* Or apply it via media query */
    @media (prefers-color-scheme: dark) {
      img {
        filter: brightness(.8) contrast(1.2);
      }
    }

<br><br>

HTML <picture> element can load different versions of an image + prepare 2 images in PS
<br>

    <picture>

      <!-- Use this image if the user's OS setting is light or unset -->
      <source srcset="photo-light.png" media="(prefers-color-scheme: light) or (prefers-color-scheme: no-preference)">

      <!-- Use this image if the user's OS setting is dark -->
      <source srcset="photo-dark.png" media="(prefers-color-scheme: dark)">

    </picture>

<br><br>

## DEPTH

<br>

Close elements should still be lighter and distant elements should still be darker – even in a dark UI.
<br>

![close and far UI elements](./img/close-far-ui-elements.png)
<br><br>

Use **opacity** to convey **depth** (with high opacity regions having a lower depth).
Elements that have a higher elevation should have a lower opacity than elements that are “closer” in depth to the background.
<br>

![opacity and depth](./img/depth-opacity.png)
<br><br>

### TYPOGRAPHY

<br>

Balance the contrast.
Use too heavy of a font and we get blaring text that’s makes us want to move away from the screen. Use too light of a font and we’ll strain our eyes while inching toward the screen to get a closer look.
<br>

**Variable fonts**
<br>

Use a lighter font weight to make the text easier to read whenever dark mode is active
<br>

CSS:

    /* normal font weight: 400; */

    body {
      font-weight: 400;
    }

    @media (prefers-color-scheme: dark) {
      body {
        font-weight: 350;
      }
    }

<br><br>

HTML >> HEAD >> Google font link:

- **declare which range of font-weight values** `@300..500`
- download those two values `@300;500`
  <br><br>

        <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@300..500&display=swap" rel="stylesheet">

<br><br>

### ICONS

<br>

Same as with typography, avoid using full white and heavy outlines.
<br><br>

**SVG icons**: change the fill with CSS
<br>

**Font icons**: change the color property
<br>

    /* SVG icon */
    body.dark-theme svg.icon path {
      fill: #efefef;
    }

    /* Font icon (using Font Awesome as an example) */
    body.dark-theme .fa {
      color: #efefef;
    }

<br><br>

### BACKGROUND

<br>

Use an off-white for the text and off-black for the background.
<br>

The recommended dark theme surface color is `#121212`.
The recommended light theme surface color is `#FFF`.

See more in [Material Design guidelines for dark mode](https://material.io/design/color/dark-theme.html).
<br><br>

### COLOR PALETTES

<br>

**Contrast**
<br>

Run ideas through a contrast checker to ensure color ratios conform to WCAG’s guidelines for at least a AA rating, which is a [contrast ratio of 4.5:1](https://css-tricks.com/understanding-web-accessibility-color-contrast-guidelines-and-ratios/).
<br>

See [more on color spectrum on web](https://css-tricks.com/the-expanding-gamut-of-color-on-the-web/).

<br>

**Dark themes**:
<br>

- desaturated colors

- accent colors are meant to be enhancements

- possible combos: dark blue background + pale yellow text, dark brown + tan

<br><br>

[Choosing colors for themes](https://www.smashingmagazine.com/2020/08/application-color-schemes-css-custom-properties/)

<br><br>

---

<br>

## Two-color borders

<br>

[Stack overflow resource](https://stackoverflow.com/questions/3906983/two-color-borders#:~:text=If%20you%20mean%20using%20two,across%20browsers%20in%20my%20experience.)

<br><br>

---

<br>

## Dark / light LOGO toggle

<br>

[StackOverflow inspo for the solution]
(https://stackoverflow.com/questions/71013868/switch-logo-color-in-dark-mode-issue)

<br><br>

For further upgrade:
<br>

[Logo toggle with OS preference](https://michaelti.ca/sandbox/2020/05/01/dark-mode-images-with-a-manual-toggle-switch/)
<br><br>

// select all "source" elements where the parent is a "picture", where "source" elements contain attribute media containing "(prefers-color-scheme: ${colorScheme})"

          `picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`

<br><br>

---

<br>

## CUSTOM CSS VARIABLES

<br>

done using a custom property name that begins with a double hyphen (`--`), and a property value that can be any valid CSS value.
<br>

It is written inside a ruleset:
<br>

    element {
      --main-bg-color: brown;
    }

<br><br>

**The selector given to the ruleset defines the scope** that the custom property can be used in.

A common best practice is to define custom properties on the :`root` pseudo-class, so that it can be applied globally across your HTML document:
<br>

    :root {
      --main-bg-color: brown;
    }

<br><br>

**Use**:
<br>

Use the custom property value by specifying your custom property name inside the `var()` function, in place of a regular property value:
<br>

    element {
      background-color: var(--main-bg-color);
    }

<br><br>

**Custom property names are case sensitive.**
<br>

**Custom properties do inherit.** This means that if no value is set for a custom property on a given element, the value of its parent is used

<br><br>

<br><br>

---

<br>

## SCSS / sass UPGRADES

<br>

[variables](https://sass-lang.com/documentation/variables)

[property declarations](https://sass-lang.com/documentation/style-rules/declarations)

<br><br>

---

<br>

## NEW FEATURES LEARNED:

<br>

### 1. **Two-color borders**

<br>

[Stack overflow resource](https://stackoverflow.com/questions/3906983/two-color-borders#:~:text=If%20you%20mean%20using%20two,across%20browsers%20in%20my%20experience.)

<br><br>

---

<br>

### 2. **Dark / light LOGO toggle**

<br>

[StackOverflow inspo for the solution]
(https://stackoverflow.com/questions/71013868/switch-logo-color-in-dark-mode-issue)

<br><br>

For further upgrade with user OS and manual change:
<br>

[Logo toggle with OS preference](https://michaelti.ca/sandbox/2020/05/01/dark-mode-images-with-a-manual-toggle-switch/)
<br><br>

"select all "source" elements where the parent is a "picture", where "source" elements contain attribute media containing "(prefers-color-scheme: ${colorScheme})" "

          `picture > source[media*="(prefers-color-scheme: ${colorScheme})"]`

<br><br>

### 3. **`aria-label`**

<br>

An attribute defines a string value that labels an interactive element.

It is intended for use on interactive elements, or elements made to be interactive via other [ARIA declarations](https://webaim.org/techniques/aria/), when there is no appropriate text visible in the DOM that could be referenced as a label
<br>

**ARIA ( (Accessible Rich Internet Applications or ARIA)) is a W3C specification for enhancing accessibility in ways that plain HTML cannot.**
<br><br>

Sometimes the default accessible name of an element is missing, or does not accurately describe its contents, and there is no content visible in the DOM that can be associated with the object to give it meaning. A common example is a button containing an SVG or icon font (which you shouldn't be using) without any text.
<br><br>

`aria-label` can be used in cases where text that could label the element is not visible. If there is visible text that labels an element, use `aria-labelledby` instead.

<br><br>

`aria-labelledby`

The purpose of `aria-labelledby` is the same as that of `aria-label`. It provides the user with a recognizable, accessible name for an interactive element. If an element has both attributes set, `aria-labelledby` will be used. `aria-labelledby` takes precedence over all other methods of providing an accessible name, including `aria-label`, <label>, and the element's inner text.
<br>

    <span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="tac"></span>
    <span id="tac">I agree to the Terms and Conditions.</span>

<br><br>

The `aria-labelledby` attribute only defines the accessible name. It doesn't provide any of <label>'s other functionality, such as **making clicking on the labeling element activate the input it is associated with. That has to be added back in with JavaScript**.
<b><br>

Fortunately, the HTML <input> with `type="checkbox"` works with native <label>. When feasible, use the following:

    <label for="tac">
      <input id="tac" type="checkbox" name="terms-and-conditions">
      I agree to the Terms and Conditions.
    </label>
    <p>
      <a href="tac.html">Read our Terms and Conditions</a>.
    </p>

<br><br>

### 4. **SELECTING ROOT ELEMENT WITH JS**

<br>

`:root` = <html> = `documentElement`
<br><br>

1.  `Document.documentElement` returns the Element that is the root element of the document (for example, the <html> element for HTML documents).
    <br>

        console.log(document.documentElement);

    <br><br>

2.  Use the "":root" selector, which matches the root element of the document
    <br>

        console.log(document.querySelector(':root'));

    <br><br>

---

<br>

### 5. LOGO dark/light toggle

<br>

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

---

<br>

### 6. Take in account user's OS preference

<br>

<br>

- [YT: prefers-color-scheme CSS only!](https://www.youtube.com/watch?v=_yCgeXFAXTM)

<br><br>

auto OS preference + manual toggle button

- [YT: How to make a website light/dark toggle with CSS & JS](https://www.youtube.com/watch?v=wodWDIdV9BY)

- [Codepen example from previous video](https://codepen.io/kevinpowell/pen/EMdjOV)

<br><br>

---

<br>

### 7. localStorage vs sessionStorage

<br>

- [localStorage guide](https://blog.logrocket.com/localstorage-javascript-complete-guide/)

- [Using localStorage in JavaScript](https://www.youtube.com/watch?v=LfeOLVGHiXI&list=WL&index=27&t=2s)

- [JavaScript Cookies vs Local Storage vs Session](https://www.youtube.com/watch?v=GihQAC1I39Q&list=PLmGRn_VnTuAxIHKjfgoOEOIk72PeZdbaB&index=112)

<br><br>

---

<br>

### 8. FORM VALIDATION

<br>

You are supposed to enter data in an expected format.

<br>

Client-side validation should not be considered an exhaustive security measure! **Your apps should always perform security checks on any form-submitted data on the server-side as well as the client-side**, because client-side validation is too easy to bypass, so malicious users can still easily send bad data through to your server
<br><br>

- validation done in the **browser** >> client-side validation

- validation done on the **server** >> server-side validation
  <br><br>

When you enter data, the browser and/or the web server will check to see that the data is in the correct format and within the constraints set by the application.
<br>

- if the information is **correctly** formatted >> app allows the data to be submitted to the server and (usually) saved in a database

- if the information is **incorrectly** formatted >> app gives the user an error message explaining what needs to be corrected, and lets them try again

<br><br>

<br>

## HTML form validation

<br>

HTML5 form controls validate most user data without relying on JavaScript. This is done by using validation attributes on form elements.

- required
- min/max length
- min/max
- type
- pattern
- step
  <br>

[Validation related attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation#validation-related_attributes)

<br>

**Valid element**:

- matches the `:valid` CSS pseudo-class, which lets you apply a specific style
- if the user tries to send the data, the browser will submit the form, provided there is nothing else stopping it from doing so

<br>

**Invalid element**:

- matches the `:invalid` CSS pseudo-class, which lets you apply a specific style to invalid elements
- if the user tries to send the data, the browser will block the form and display an error message

<br><br>

**Good practice**:

Indicate to the user when form fields are required (required by WCAG accessibility guidelines).

Only require users to input data you actually need.

**Character count feedback**:

Inn an accessible manner and let them edit their content down to size.
An example of this is the character limit seen on Twitter when tweeting. JavaScript, including [solutions using maxlength](https://github.com/mimo84/bootstrap-maxlength), can be used to provide this.

<br><br>

1: **Built-in HTML form validation**
<br>

- has better performance than JS
- not as customizable as JS validation
- browser-automated error message
  <br><br>

`:invalid`

Can be “chained” with other pseudo-selectors: like `:focus` to only validate when the user is typing, `:before` or :after to generate icons or text to provide more user feedback, or attribute selectors like `input[value=""]` to only validate input fields containing content.

<br><br>

#### Resources

- [MDN Client side form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

- [The HTML5 input types (form controls)](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)

<br><br>

---

<br>

2: **JS form validation**
<br><br>

- control over the look and feel of native error messages
- to deal with legacy browsers that do not support HTML's built-in form validation
  <br>

Most useful JS properties:

- `novalidate`
- `validity`
- `typeMismatch`
- `setCustomValidity`

<br><br>

[Constraint validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)

- `HTMLButtonElement` (represents a `button` element)

- `HTMLFieldSetElement` (represents a `fieldset` element)

- `HTMLInputElement` (represents an `input` element)

- `HTMLOutputElement` (represents an `output` element)

- `HTMLSelectElement` (represents a `select` element)

- `HTMLTextAreaElement` (represents a `textArea` element)

<br><br>

### Constraint validation API

<br>

The **Constraint validation API** makes the following **properties** available on the above elements.
<br>

1. `validationMessage`

Returns a localized message describing the validation constraints that the control doesn't satisfy (if any). If the control is not a candidate for constraint validation (`willValidate` is `false`) or the element's value satisfies its constraints (is valid), this will return an empty string.

2. `validity`

Returns a `ValidityState` object that contains several properties describing the validity state of the element. You can find full details of all the available properties in the `ValidityState` reference page; below is listed a few of the more common ones:

- `patternMismatch`

  Returns `true` if the value does not match the specified `pattern`, and `false` if it does match. If `true`, the element matches the `:invalid` CSS pseudo-class.

- `tooLong`

  Returns `true` if the value is longer than the maximum length specified by the `maxlength` attribute, or `false` if it is shorter than or equal to the maximum. If `true`, the element matches the `:invalid` CSS pseudo-class.

- `tooShort`

  Returns `true` if the value is shorter than the minimum length specified by the `minlength` attribute, or `false` if it is greater than or equal to the minimum. If `true`, the element matches the `:invalid` CSS pseudo-class.

- `rangeOverflow`

  Returns `true` if the value is greater than the maximum specified by the `max` attribute, or `false` if it is less than or equal to the maximum. If `true`, the element matches the `:invalid` and `:out-of-range` CSS pseudo-classes.

- `rangeUnderflow`

  Returns `true` if the value is less than the minimum specified by the `min` attribute, or `false` if it is greater than or equal to the minimum. If `true`, the element matches the `:invalid` and `:out-of-range` CSS pseudo-classes.

- `typeMismatch`

Returns `true` if the value is not in the required syntax (when type is `email` or `url`), or `false` if the syntax is correct. If `true`, the element matches the `:invalid` CSS pseudo-class.

- `valid`

  Returns `true` if the element meets all its validation constraints, and is therefore considered to be valid, or `false` if it fails any constraint. If `true`, the element matches the `:valid` CSS pseudo-class; the `:invalid` CSS pseudo-class otherwise.

- `valueMissing`

  Returns `true` if the element has a required attribute, but no value, or `false` otherwise. If `true`, the element matches the `:invalid` CSS pseudo-class.

3. `willValidate`

Returns `true` if the element will be validated when the form is submitted; `false` otherwise.
<br><br>

The Constraint Validation API also makes the following **methods** available on the above elements and the `form` element.
<br><br>

1. `checkValidity()`

Returns `true` if the element's value has no validity problems; `false` otherwise. If the element is invalid, this method also fires an invalid event on the element.
<br>

2. `reportValidity()`

Reports invalid field(s) using events. Useful in combination with `preventDefault()` in an `onSubmit` event handler.
<br>

3. `setCustomValidity(message)`

**Adds a custom error message to the element**.
If you set a custom error message, the element is considered to be invalid, and the specified error is displayed. This lets you use JavaScript code to establish a validation failure other than those offered by the standard HTML5 validation constraints.
**The message is shown to the user when reporting the problem.**

<br><br>

**`validity`**

The `validity` read-only property of the `HTMLObjectElement` interface returns a `ValidityState` object with the validity states that this element is in.

<br><br>

**`ValidityState.typeMismatch`**

The read-only `typeMismatch` property of a `ValidityState` object indicates if the value of an <input>, after having been edited by the user, does not conform to the constraints set by the element's type attribute.

Returns `true` if the value is not in the required syntax (when type is `email` or `url`), or `false` if the syntax is correct. **If `true`, the element matches the `:invalid` CSS pseudo-class**.

If the `type` attribute expects specific strings, such as the `email` and `url` types and the **value doesn't conform to the constraints set by the type**, the `typeMismatch` property will be **true**.

The `typeMismatch` is only one of the many possible errors and is only relevant for the `email` and `url` types.

<br><br>

    |  Input type |        Value        |	        	  Expected value          |
    |-------------------------------------------------------------------------|
    |    email   	|    x@y or  x@y.z	  |  email address, with or without TLD |
    |-------------------------------------------------------------------------|
    |    url	    |   x:  or  x://y.z   |	 protocol or full URL with protocol |

<br><br>

**`novalidate`**

**Attribute that turns off the browser's automatic validation.**

This lets our script take control over validation.

Doesn't disable support for the constraint validation API nor the application of CSS pseudo-classes. Even though the browser doesn't automatically check the validity of the form before sending its data, you can still do it yourself and style the form accordingly.

<br><br>

### Validating forms without a built-in API

<br>

- legacy browsers
- [custom controls](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_build_custom_form_controls)

<br>

**When writing your own validation form, ask yourself:**

1. What kind of validation should I perform? (string operations, type conversion, regular expressions etc.)
   <br>

2. What should I do if the form doesn't validate? (UI)

   Decide how the form will behave.

   Does the form send the data anyway?

   Should you highlight the fields that are in error?

   Should you display error messages?

<br>

3. How can I help the user to correct invalid data?

   Provide as much helpful information as possible in order to guide them in correcting their inputs. You should offer up-front suggestions so they know what's expected, as well as clear error messages.

<br><br>

---

<br><br>

## Constraint validation

<br>

The core of constraint validation is an algorithm browsers run when a form is submitted to determine its validity. To make this determination, the algorithm utilizes new HTML5 attributes min , max , step , pattern , and required as well as existing attributes maxlength and type.

The idea is to trigger JavaScript on some `form` field event (like `onchange`) to calculate whether the constraint is violated, and then to use the method `field.setCustomValidity()` to set the result of the validation.

<br><br>

- new semantic types for the `input` element and constraint validation to ease the work of checking the form content on the client side

- usual constraints can be checked, without the need for JS by setting new attributes

- more complex constraints can be tested using the Constraint validation API

<br>

**HTML5 Constraint validation doesn't remove the need for validation on the server side, in a way that is consistent with what is done on the client side**. Invalid form requests can still be sent by non-compliant browsers.
<br><br>

`type="url"` and `type="email"` attributes have intrinsic constraints.
Value must be complete URL or syntactically valid email, else `typeMismatch` constraint validation is triggered.

But most input types don't have intrinsic constraints, as some are barred from constraint validation or have a sanitization algorithm transforming incorrect values to a correct default

<br><br>

### Constraint validation process

<br>

- done through the Constraint Validation API
- on a single element that is part of the `form`
- on the `form` element itself

<br><br>

`checkValidity()` = _statically_ validating the constraints

`reportValidity()`, submitting the `form` = _interactively_ validating the constraints

<br><br>

**1. way**

a) call to the `checkValidity()` or `reportValidity()` method of a form-associated DOM interface
(`HTMLInputElement`, `HTMLSelectElement`, `HTMLButtonElement`, `HTMLOutputElement` or `HTMLTextAreaElement`)

b) method evaluates the constraints only on this element

c) script gets info

d) `checkValidity()` method returns a boolean indicating whether the element's value passes its constraints
(typically done by determining which of the CSS pseudo-classes, `:valid` or `:invalid`, applies)

e) `reportValidity()` method reports any constraint failures to the user

<br>

**2. way**

call to the `checkValidity()` or `reportValidity()` method on the `HTMLFormElement` interface

Calling the `submit()` method on the `HTMLFormElement` interface doesn't trigger a constraint validation.
This method sends the form data to the server even if doesn't satisfy the constraints.
**Call the `click()` method on a submit button instead.**

<br>

**3. way**

submitting the `form` itself

If the `novalidate` attribute is set on the `form` element, interactive validation of the constraints doesn't happen.

<br><br>

### Visual styling of constraint validation

<br>

Done via CSS pseudo-classes:

- `:required`

- `:optional`

- `:placeholder-shown`

- `:valid`

- `:invalid`

<br><br>

### Controlling the text of constraint violation

<br>

`element.setCustomValidity(message)` method on the following elements:

- `fieldset`

- `input`

- `output`

- `select`

- submit buttons (`button type="submit"` `input type="submit"`) >> other buttons don't have constraint validation

- `textarea`
  <br>

The `ValidityState` interface describes the object returned by the `validity` property of the element types listed above. It represents various ways that an entered value can be invalid. Together, they help explain why an element's value fails to validate, if it's not valid.

<br><br>

### `return false` vs `prevernt default`

<br>

`preventDefault()` and `return false` are the different **ways to prevent the default event from happening**.

For example, when user clicks on an external link, we should display a confirmation modal that asks user for redirecting to the external website or not:
<br>

```js
hyperlink.addEventListener("click", function (e) {
  // Don't redirect user to the link
  e.preventDefault();
});
```

<br><br>

Or we don't want to submit the form when clicking its submit button. Instead, we want to validate the form first:
<br>

```js
submitButton.addEventListener("click", function (e) {
  // Don't submit the form when clicking a submit
  e.preventDefault();
});
```

<br><br>

**Diferences**
<br>

`return false` doesn't have any effect on the default behavior if you use the `addEventListener` method to handle an event. It only works when the event handler is declared as an element's attribute.
`return false` will cancel the event except the mouseover event

`onclick` is event handler for processing click events on a given element. Function expression receives mouse event as argument.

    target.onclick = functionRef;

<br>

Only one `onclick` handler can be assigned to an object at a time. You may prefer to use the `EventTarget.addEventListener()` method instead, since it's more flexible.

<br>

```js

```

<br><br>

```js
hyperlink.addEventListener("click", function (e) {
  // Does NOT work
  return false;
});

// Work
hyperlink.onclick = function (e) {
  return false;
};
```

<br><br>

**Good practices**
<br>

Recommended to use the `preventDefault` method instead of `return false` inside an event handler. Because the latter only works with using the `onclick` attribute which will remove other handlers for the same event.

<br><br>

- [event.preventDefault vs return false](https://thisthat.dev/event-prevent-default-vs-return-false/)

<br><br>

---

#### Resources:

- [MDN Constraint validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation)

<br><br>

---

<br>

**AUTHENTICATION vs VALIDATION**
<br>

Authentication is something which validates or confirms the authenticity of something.
Validation is the act of validating something.

<br><br>

## AUTHENTICATION vs AUTHORIZATION

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

<br><br>

---

### Resources

<br>

[A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)

<br><br>

[A DRY approach to color themes in CSS](https://css-tricks.com/a-dry-approach-to-color-themes-in-css/)
