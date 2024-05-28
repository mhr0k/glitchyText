function shuffle(arr) {
  arr.forEach((v, i) => {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  });
  return arr;
}
function binarize(arr) {
  arr.forEach((v, i) => {
    arr[i] = Math.random() < 0.5 ? "0" : "1";
  });
  return arr;
}
function randomize(arr) {
  const letters =
    "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-_=+[]{};:<,>.?/~`";
  arr.forEach((v, i) => {
    arr[i] = letters[Math.floor(Math.random() * letters.length)];
  });
  return arr;
}
function changeCase(arr, type) {
  if (type === "random") {
    arr.forEach((v, i) => {
      if (Math.random() < 0.5) {
        arr[i] = arr[i].toLowerCase();
      } else {
        arr[i] = arr[i].toUpperCase();
      }
    });
  }
  if (type === "lower") {
    arr.forEach((v, i) => {
      arr[i] = arr[i].toLowerCase();
    });
  }
  if (type === "upper") {
    arr.forEach((v, i) => {
      arr[i] = arr[i].toUpperCase();
    });
  }
  return arr;
}

async function glitchyText(element, options) {
  let elArr;
  if (typeof element === "string") {
    elArr = Array.from(document.querySelectorAll(element));
  } else if (element instanceof HTMLElement) {
    elArr = [element];
  } else if (Array.isArray(element)) {
    if (element.find((el) => !(el instanceof HTMLElement))) {
      console.error("glitchyText: The array contains non-HTMLElements.");
    }
    elArr = filtered;
  } else if (element instanceof NodeList) {
    elArr = Array.from(element);
  } else {
    console.error(
      "glitchyText: The element argument must be a query string, HTMLElement or array of elements, or NodeList."
    );
    return;
  }

  const effect = options?.type || "random"; // binary, random, shuffle
  const speed = options?.speed || 50;
  const duration = options?.duration || 500;
  const delay = options?.delay || 0;
  const stagger = options?.stagger || 0;
  const direction = options?.direction || "ltr"; // ltr, rtl
  const recase = options?.recase || "none"; // upper, lower, random, none

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  elArr.forEach(async (el, i) => {
    if (el.glitchyTextActive === true) {
      return;
    }
    el.glitchyTextActive = true;

    if (stagger) {
      await new Promise((resolve) => setTimeout(resolve, stagger * i));
    }
    const text = el.innerText;
    const chars = text.split("");
    let timeLeft = duration;

    const interval = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(interval);
        el.innerText = text;
        el.glitchyTextActive = false;
        return;
      }
      let arr1 = [];
      let arr2 = chars; //effect
      if (direction === "ltr") {
        let splitIndex =
          chars.length - Math.floor((chars.length * timeLeft) / duration);
        arr1 = chars.slice(0, splitIndex);
        arr2 = chars.slice(splitIndex);
      } else if (direction === "rtl") {
        let splitIndex = Math.floor(((chars.length - 1) * timeLeft) / duration);
        arr1 = chars.slice(0, splitIndex);
        arr2 = chars.slice(splitIndex);
      }
      if (effect === "shuffle") shuffle(arr2);
      else if (effect === "binary") binarize(arr2);
      else if (effect === "random") randomize(arr2);
      if (recase) changeCase(arr2, recase);
      let final = arr1.concat(arr2);
      el.innerText = final.join("");
      timeLeft -= speed;
    }, speed);
  });
}

export default glitchyText;
