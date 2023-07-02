const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your height in centimeters: ", (height) => {
  rl.question("Enter your weight in Kg: ", (weight) => {
    height = parseFloat(height);
    weight = parseFloat(weight);

    height = height / 100;
    const bmi = weight / (height * height);

    console.log(`Your Body-Mass index is: ${bmi.toFixed(2)}`);

    if (bmi > 0) {
      if (bmi <= 16) {
        console.log("You are severely under-weight.");
      } else if (bmi <= 18.5) {
        console.log("You are under-weight.");
      } else if (bmi <= 25) {
        console.log("You are Healthy.");
      } else if (bmi <= 30) {
        console.log("You are overweight.");
      } else {
        console.log("You are severely overweight.");
      }
    } else {
      console.log("Please enter valid details.");
    }

    rl.close();
  });
});
