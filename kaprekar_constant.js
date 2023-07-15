function kaprekarConstant(n) {
    let count = 0;
    while (n !== 6174) {
        count++;
        let digits = n.toString().padStart(4, '0');
        let ascending = Number(digits.split('').sort().join(''));
        let descending = Number(digits.split('').sort().reverse().join(''));
        n = descending - ascending;
    }
    return count;
}

const user_input = prompt("Enter a number:");
const steps = kaprekarConstant(user_input);
console.log(`Number of steps to reach Kaprekar constant: ${steps}`);
