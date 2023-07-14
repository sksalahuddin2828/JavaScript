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

// 2. 
