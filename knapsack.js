function stackSack(items, weight, value, number) {
  const knapsack = new Array(number + 1).fill(0).map(() => new Array(items + 1).fill(0));

  // Build table for knapsack[][] in bottom-up manner
  for (let i = 0; i <= number; i++) {
    for (let j = 0; j <= items; j++) {
      if (i === 0 || j === 0) {
        knapsack[i][j] = 0;
      } else if (weight[i - 1] <= j) {
        knapsack[i][j] = Math.max(value[i - 1] + knapsack[i - 1][j - weight[i - 1]], knapsack[i - 1][j]);
      } else {
        knapsack[i][j] = knapsack[i - 1][j];
      }
    }
  }

  return knapsack[number][items];
}

const value = [60, 100, 120];
const weight = [10, 20, 30];
const items = 50;
const number = value.length;

const result = stackSack(items, weight, value, number);
console.log(result);
