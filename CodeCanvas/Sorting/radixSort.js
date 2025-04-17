function sampleArray(times, interval) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(Math.floor(Math.random() * interval));
  }
  return arr;
}

function intIndex(num, index) {
  return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10;
}

function intDigitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function intArrMostDigits(arr) {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    const current = intDigitCount(arr[i]);

    if (max < current) max = current;
  }
  return max;
}

function radixSort(arr) {
  const maxDigit = intArrMostDigits(arr);
  for (let i = 0; i < maxDigit; i++) {
    let buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const current = arr[j];
      buckets[intIndex(current, i)].push(current);
    }

    arr = [].concat(...buckets);
  }

  return arr;
}

console.log(radixSort(sampleArray(100, 100)));
