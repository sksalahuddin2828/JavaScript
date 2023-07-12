const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let incomeList = [];

rl.question("Enter the income of 10 people:\n", function() {
  askIncome(0);
});

function askIncome(person) {
  if (person >= 10) {
    rl.close();
    sortAndPrintIncome();
    return;
  }

  rl.question(`Enter income for person ${person + 1}: `, function(income) {
    incomeList.push(parseInt(income));
    askIncome(person + 1);
  });
}

function sortAndPrintIncome() {
  for (let firstIndex = 0; firstIndex < 9; firstIndex++) {
    let swapCount = 0;
    let minIncome = incomeList[firstIndex];
    let minIndex = firstIndex;

    for (let secondIndex = firstIndex + 1; secondIndex < 10; secondIndex++) {
      if (minIncome > incomeList[secondIndex]) {
        minIncome = incomeList[secondIndex];
        swapCount++;
        minIndex = secondIndex;
      }
    }

    if (swapCount !== 0) {
      let temp = incomeList[firstIndex];
      incomeList[firstIndex] = minIncome;
      incomeList[minIndex] = temp;
    }
  }

  console.log("Sorted income list:");
  incomeList.forEach(income => {
    console.log(income);
  });
}
