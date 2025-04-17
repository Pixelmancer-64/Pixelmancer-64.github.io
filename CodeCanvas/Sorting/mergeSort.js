function sampleArray(times, interval) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(Math.floor(Math.random() * interval));
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, pivot)), mergeSort(arr.slice(pivot)));
}

function merge(arr_x, arr_y) {
  let result = [];
  let x = 0;
  let y = 0;

  while (x < arr_x.length && y < arr_y.length) {
    if (arr_x[x] < arr_y[y]) {
      result.push(arr_x[x]);
      x++;
    } else {
      result.push(arr_y[y]);
      y++;
    }
  }

  while (x < arr_x.length) {
    result.push(arr_x[x]);
    x++;
  }

  while (y < arr_y.length) {
    result.push(arr_y[y]);
    y++;
  }

  return result;
}

console.log(mergeSort(sampleArray(1000, 100)));
