const romans = {
  1: "Ⅰ",
  2: "Ⅱ",
  3: "Ⅲ",
  4: "Ⅳ",
  5: "Ⅴ",
  9: "Ⅸ",
  10: "Ⅹ",
  40: "ⅩⅬ",
  50: "L",
  90: "ⅩⅭ",
  100: "Ⅽ",
  400: "ⅭⅮ",
  500: "Ⅾ",
  900: "ⅭⅯ",
  1000: "Ⅿ",
};

const numbers = (() => {
  let array = [];
  for (const key in romans) {
    array.push(key);
  }
  return array;
})();

console.log(checkNumber(parseInt(process.argv[2])));

function checkNumber(myNumber) {
  let string = "";
  if (myNumber > romans[romans.length - 1] || !Number.isInteger(myNumber))
    return "INVALID ENTRY";
  while (myNumber > 0) {
    for (let i = numbers.length - 1; i >= 0; i--) {
      const n = numbers[i];
      if (myNumber % n != myNumber) {
        string += romans[n];
        myNumber -= n;
        break;
      }
    }
  }
  return string;
}