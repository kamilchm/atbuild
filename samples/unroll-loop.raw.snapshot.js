var lines = [];
for (var k = 0; k < 2; ++k)
  for (var j = 0; j < 2; ++j)
    for (var i = 0; i < 2; ++i, ++g) {
      lines.push(`
  _i = data.index(x[0] + ${i} - 1, x[1] + ${j} - 1, x[2] + ${k} - 1);
  if ((blocks[${g}] = data.data[_i])) {
    if (lastSolidMaterial && lastSolidMaterial !== blocks[${g}]) {
      isChangingMaterial = true;
    }
    lastSolidMaterial = blocks[${g}];
  }

  var p = solidity.data[_i] ? -0.5 : 0.51;
  grid[${g}] = p;
  mask |= p < 0 ? 1 << g : 0;
  `);
    }

module.exports = lines.join("\n");
