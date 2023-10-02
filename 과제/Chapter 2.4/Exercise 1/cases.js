const permutation = (n, r) => {
  let result = 1;
  for (let i = n; i > n - r; i--) result *= i;
  return result;
};

const combination = (n, r) => {
  let result = permutation(n, r);
  for (let i = 2; i <= r; i++) result /= i;
  return result;
};

const multiPermutation = (n, r) => n ** r;

const multiCombination = (n, r) => combination(n + r - 1, r);


module.exports = {
  permutaion,
  combination,
  multiPermutation,
  multiCombination
};
