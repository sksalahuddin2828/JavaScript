class Complex {
  constructor() {
    this.real = 0.0;
    this.imag = 0.0;
  }

  set_data() {
    this.real = parseFloat(prompt("Enter the real value of the complex number: "));
    this.imag = parseFloat(prompt("Enter the imaginary value of the complex number: "));
  }

  add(a, b, c, d) {
    this.real = a + c;
    this.imag = b + d;
  }

  subtract(a, b, c, d) {
    this.real = a - c;
    this.imag = b - d;
  }

  multiply(a, b, c, d) {
    this.real = a * c - b * d;
    this.imag = a * d + b * c;
  }

  divide(a, b, c, d) {
    this.real = (a * c + b * d) / (c * c + d * d);
    this.imag = (b * c - a * d) / (c * c + d * d);
  }

  get_data() {
    if (this.imag >= 0) {
      console.log(`${this.real}+${this.imag}i`);
    } else {
      console.log(`${this.real}${this.imag}i`);
    }
  }
}

const x1 = new Complex();
const x2 = new Complex();
const addition = new Complex();
const subtraction = new Complex();
const multiplication = new Complex();
const division = new Complex();

x1.set_data();
x2.set_data();

console.log("Complex number 1 is:");
x1.get_data();
console.log("Complex number 2 is:");
x2.get_data();

let ans = 1;
while (ans === 1) {
  console.log("Choose the operation to perform:");
  console.log("1. Addition\n2. Subtraction\n3. Multiplication\n4. Division");
  const a = parseInt(prompt());

  if (a === 1) {
    addition.add(x1.real, x1.imag, x2.real, x2.imag);
    console.log("Addition of Complex 1 and Complex 2 is:");
    addition.get_data();
  } else if (a === 2) {
    subtraction.subtract(x1.real, x1.imag, x2.real, x2.imag);
    console.log("Subtraction of Complex 2 from Complex 1 is:");
    subtraction.get_data();
  } else if (a === 3) {
    multiplication.multiply(x1.real, x1.imag, x2.real, x2.imag);
    console.log("Multiplication of Complex 1 and Complex 2 is:");
    multiplication.get_data();
  } else if (a === 4) {
    if (x2.real === 0 && x2.imag === 0) {
      console.log("Can't divide by zero");
    } else {
      division.divide(x1.real, x1.imag, x2.real, x2.imag);
      console.log("On division of Complex 1 by Complex 2, we get:");
      division.get_data();
    }
  } else {
    console.log("Invalid option chosen!");
  }

  ans = parseInt(prompt("Do you want to check more? (1 for yes / 2 for no): "));
  if (ans === 2) {
    break;
  }
}

console.log("\nThank you");
