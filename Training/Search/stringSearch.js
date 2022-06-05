function stringSearch(string, reg) {
  let times = 0;
  for (let i = 0; i < string.length; i++) {
    let matches = 0;

    while (matches < reg.length && string[i + matches] === reg[matches])
      matches++;
    if (matches === reg.length) times++;
  }
  return times;
}

console.log(stringSearch("arara", "a"));
