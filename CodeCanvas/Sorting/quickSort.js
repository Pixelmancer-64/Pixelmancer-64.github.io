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

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivot = partition(arr, left, right);

    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot+1, right);
  }
  return arr;
}

function partition(arr, start = 0, end = arr.length - 1) {
  const pivot = arr[start];
  let swapIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }

  swap(arr, start, swapIndex);
  return swapIndex;
}

console.log(quickSort(sampleArray(20, 20)))