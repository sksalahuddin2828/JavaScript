const readline = require('readline-sync');

const num = parseFloat(readline.question('Enter a number: '));

// Find the square root of the number
const realPart = Math.sqrt(Math.abs(num));
const imaginaryPart = Math.sqrt(-num);

// Display the result
if (imaginaryPart === 0) {
    console.log(`The square root of ${num} is ${realPart.toFixed(3)}`);
} else {
    console.log(`The square root of ${num} is ${realPart.toFixed(3)}+${imaginaryPart.toFixed(3)}i`);
}
