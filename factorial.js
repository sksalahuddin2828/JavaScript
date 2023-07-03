function calculateFactorial(n) {
    if (n > 1) {
        return n * calculateFactorial(n - 1);
    } else {
        return 1;
    }
}

let number = parseInt(prompt("Enter a non-negative number:"));
let result = calculateFactorial(number);
console.log(`Factorial of ${number} = ${result}`);
