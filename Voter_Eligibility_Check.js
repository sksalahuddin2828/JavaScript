// Program for checking voter age

while (true) {
    try {
        const age = parseInt(prompt("Enter your age:"));

        if (Number.isNaN(age)) {
            throw new Error();
        }

        if (18 <= age && age <= 120) {
            console.log("Congratulations!");
            console.log("You are eligible to vote.");
        } else if (12 <= age && age < 18) {
            console.log("You are not yet eligible to vote.");
            console.log("Enjoy your teenage years!");
        } else if (0 <= age && age < 12) {
            console.log("You are too young to vote.");
            console.log("Make the most of your childhood!");
        } else if (age < 0) {
            console.log("Invalid age entered.");
            console.log("Please enter a positive value.");
        } else {
            console.log("You have surpassed the maximum voting age.");
            console.log("Thank you for your contribution to society!");
        }

        break;
    } catch (error) {
        console.log("Invalid age entered. Please enter a valid integer age.");
    }
}


// -------------------------------END---------------------------------

// The program above is very dynamic while the program below is static

// ------------------------------START--------------------------------


// Program for checking voter age

const age = parseInt(prompt("Enter your age:"));

// Check if the age is within a valid range for voting
if (age >= 18 && age <= 120) {
    console.log("Congratulations!");
    console.log("You are eligible to vote.");
} else if (age >= 12 && age < 18) {
    console.log("You are not yet eligible to vote.");
    console.log("Enjoy your teenage years!");
} else if (age >= 0 && age < 12) {
    console.log("You are too young to vote.");
    console.log("Make the most of your childhood!");
} else if (age < 0) {
    console.log("Invalid age entered.");
    console.log("Please enter a positive value.");
} else {
    console.log("You have surpassed the maximum voting age.");
    console.log("Thank you for your contribution to society!");
}
