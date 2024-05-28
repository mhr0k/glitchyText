## GlitchyText

This is a customizable JS function that generates "glitchy" text effects. It takes in one or multiple HTML Elements and replaces their inner text with random characters (configurable) on an interval.

![](https://github.com/mhr0k/glitchyText/blob/master/showcase.gif?raw=true)

## Usage

Add glitchyText.js file to your project, import it and use the function:

```javascript
import glitchyText from "./glitchyText.js";
glitchyText(".glitchy");
```

You can target the elements via a css query string like above or pass in DOM elements:

```javascript
import glitchyText from "./glitchyText.js";
const element = document.querySelector("p");
const element2 = document.querySelectorAll(".heading a");
glitchyText(element);
glitchyText(element2);
```

## Options

You can customize the effect by passing in an object as the second argument:

```javascript
import glitchyText from "./glitchyText.js";
glitchyText(".button span", {
  duration: 5000, // all time-based options use milliseconds
  speed: 100, // how quickly the characters change
  delay: 100, // delay the onset of the effect
  stagger: 100, // stagger multiple elements
  effect: "shuffle", // binary, random, shuffle
  direction: "rtl", // rtl, ltr, none
  recase: "lower", // random, lower, upper
});
```
