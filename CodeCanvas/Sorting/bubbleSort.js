function sampleArray(times, interval) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(Math.floor(Math.random() * interval));
  }
  return arr;
}

function swap(arr, id1, id2) {
  [arr[id1], arr[id2]] = [arr[id2], arr[id1]];
}

function bubbleSort(arr) {
  for (let i = arr.length; i != 0; i--) {
    let didSwap = false;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        didSwap = true;
      }
    }
    if (!didSwap) break;
  }
  return arr;
}

const array = sampleArray(10, 10);
console.log(bubbleSort(array));
