//-------------------------------------------------------------JavaScript Coding Challenges-----------------------------------------------------

// JavaScript Coding Challenges on Numbers 
// Write a program in JavaScript to -

// 1. Convert decimal numbers to octal numbers.
// 2. Reverse an integer.
// 3. Print the Fibonacci series using the recursive method.
// 4. Return the Nth value from the Fibonacci sequence.
// 5. Find the average of numbers (with explanations).
// 6. Convert Celsius to Fahrenheit.

//----------------------------------------------------------------Solution of Problem:----------------------------------------------------------

// 1. Converting Decimal Numbers to Octal Numbers:

let decimal_number = 25;
let octal_number = [];

while (decimal_number > 0) {
    octal_number.push(decimal_number % 8);
    decimal_number = Math.floor(decimal_number / 8);
}

process.stdout.write("Octal number: ");

for (let i = octal_number.length - 1; i >= 0; i--) {
    process.stdout.write(octal_number[i].toString());
}

//----------------------------------------------------------------------------------------------------------------------------------------------

// 2. Reversing an Integer:

let number = 12345;
let reversed_number = 0;

while (number !== 0) {
    reversed_number = reversed_number * 10 + number % 10;
    number = Math.floor(number / 10);
}

console.log(reversed_number);

//----------------------------------------------------------------------------------------------------------------------------------------------

// 3. Printing the Fibonacci Series using Recursion:

function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

let n = 10;
process.stdout.write("Fibonacci series: ");

for (let i = 0; i < n; i++) {
    process.stdout.write(fibonacci(i) + " ");
}

//----------------------------------------------------------------------------------------------------------------------------------------------

// 4. Returning the Nth Value from the Fibonacci Sequence:

function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

let n = 10;
let fibonacci_number = fibonacci(n);
console.log(fibonacci_number);

//----------------------------------------------------------------------------------------------------------------------------------------------

// 5. Finding the Average of Numbers:


