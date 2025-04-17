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

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; arr[j + 1] < arr[j]; j--) {
      swap(arr, j + 1, j);
    }
  }
  return arr;
}

function insertionSortC(arr) {
  for (let i = 1; i < arr.length; i++) {
    let val = arr[i];
    let j = i - 1;
    for (; arr[j] > val; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = val;
  }
  return arr;
}

const sample = sampleArray(99, 99);
const sample2 = [...sample];
const result = insertionSort(sample);
const result2 =insertionSortC(sample2);

console.log(result2)
