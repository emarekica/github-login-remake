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
