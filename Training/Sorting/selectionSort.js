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

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    swap(arr, i, lowest);
  }
  return arr;
}

console.log(selectionSort(sampleArray(100, 100)));
