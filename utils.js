function randomElement(arr) {
  return arr[randomNumber(arr.length)];
}

function randomNumber(end, start = 0) {
  return start + Math.floor(Math.random() * (end - start));
}
