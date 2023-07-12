const readline = require('readline-sync');

const number = parseInt(readline.question('Please enter the total number you want to enter: '));

const array = [];
for (let i = 0; i < number; i++) {
    const element = parseInt(readline.question(`Enter the element ${i + 1}: `));
    array.push(element);
}

for (let i = 0; i < Math.floor(number / 2); i++) {
    const temp = array[i];
    array[i] = array[number - 1 - i];
    array[number - 1 - i] = temp;
}

console.log('\nReverse all elements of the array:');
for (const element of array) {
    console.log(element);
}
