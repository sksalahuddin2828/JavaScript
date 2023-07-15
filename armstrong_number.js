function isArmstrongNumber(n) {
    const numDigits = String(n).length;
    let sumOfPowers = 0;
    let temp = n;
    while (temp > 0) {
        const digit = temp % 10;
        sumOfPowers += Math.pow(digit, numDigits);
        temp = Math.floor(temp / 10);
    }
    return n === sumOfPowers;
}

const user_input = prompt("Enter a number:");
if (isArmstrongNumber(user_input)) {
    console.log('${user_input} is an Armstrong number.');
} else {
    console.log('${user_input} is not an Armstrong number.');
}

//-----------------------------------------------------------------------

function isArmstrongNumber(n) {
    const numDigits = String(n).length;
    let sumOfPowers = 0;
    let temp = n;
    while (temp > 0) {
        const digit = temp % 10;
        sumOfPowers += Math.pow(digit, numDigits);
        temp = Math.floor(temp / 10);
    }
    return n === sumOfPowers;
}

console.log(isArmstrongNumber(153)); 

// Output: true
