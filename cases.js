const permutation = (n, r) => {
  let result = 1;
  for (let i = n; i > n - r; i--) result *= i;
  return result;
};

module.exports = {
  permutaion,
};
