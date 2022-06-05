export function sampleArray(times, interval) {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(Math.floor(Math.random() * interval));
  }
  return arr;
}

export function swap(arr, id1, id2) {
  [arr[id1], arr[id2]] = [arr[id2], arr[id1]];
}
