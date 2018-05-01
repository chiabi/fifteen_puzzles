const COL = 4;
const offset = [];

for (let i = 0, k = 0; i < COL; i++) {
  for (let j = 0; j < COL; j++, k++) {
    offset.push({x: j, y: i, o: k});
  }
}
console.log(offset);