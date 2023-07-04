class Solution {
  minDifficulty(jobDifficulty, d) {
    const n = jobDifficulty.length;
    if (n < d) {
      return -1;
    }

    const memo = new Array(n).fill(null).map(() => new Array(d + 1).fill(-1));

    return this.dp(jobDifficulty, 0, d, memo);
  }

  dp(jobDifficulty, i, d, memo) {
    if (d === 1) {
      let maxDifficulty = -Infinity;
      for (let j = i; j < jobDifficulty.length; j++) {
        maxDifficulty = Math.max(maxDifficulty, jobDifficulty[j]);
      }
      return maxDifficulty;
    }

    if (i === jobDifficulty.length - 1) {
      return Infinity;
    }

    if (memo[i][d] !== -1) {
      return memo[i][d];
    }

    let curDifficulty = jobDifficulty[i];
    let minDifficulty = Infinity;

    for (let j = i; j < jobDifficulty.length - d + 1; j++) {
      curDifficulty = Math.max(curDifficulty, jobDifficulty[j]);
      const change = curDifficulty + this.dp(jobDifficulty, j + 1, d - 1, memo);
      minDifficulty = Math.min(minDifficulty, change);
    }

    memo[i][d] = minDifficulty;
    return minDifficulty;
  }
}

const jobDifficulty = [6, 5, 4, 3, 2, 1];
const days = 2;

const solution = new Solution();
const result = solution.minDifficulty(jobDifficulty, days);

console.log("Minimum difficulty:", result);
