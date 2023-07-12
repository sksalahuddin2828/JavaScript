// Number of program 1
let squareRoot2 = Math.sqrt(2);
console.log(squareRoot2);

// Number of program 2
let half = 1 / 2;
let third = 1 / 3;
let sumResult = half + third;
console.log(sumResult);

// Number of program 3
let varX, varY;
let binomialExpr = Math.pow(varX + varY, 6);
console.log(binomialExpr);

// Number of program 4
let trigExpr = Math.sin(varX) / Math.cos(varX);
console.log(trigExpr);

// Number of program 5
let equation = (Math.sin(varX) - varX) / Math.pow(varX, 3);
console.log(equation);

// Number of program 6
let logExpr = Math.log(varX);
let logDerivative = 1 / varX;
let inverseDerivative = 1 / Math.pow(varX, 2);
let sinDerivative = Math.cos(varX);
let cosDerivative = -Math.sin(varX);
console.log(`Derivative of log(x) with respect to x: ${logDerivative}`);
console.log(`Derivative of 1/x with respect to x: ${inverseDerivative}`);
console.log(`Derivative of sin(x) with respect to x: ${sinDerivative}`);
console.log(`Derivative of cos(x) with respect to x: ${cosDerivative}`);

// Number of program 7
let equation1 = varX + varY - 2;
let equation2 = 2 * varX + varY;
console.log(`x = ${equation1}`);
console.log(`y = ${equation2}`);

// Number of program 8
let integratedExpr1 = (Math.pow(varX, 3)) / 3;
console.log(`Integration of x^2: ${integratedExpr1}`);

let integratedExpr2 = -Math.cos(varX);
console.log(`Integration of sin(x): ${integratedExpr2}`);

let integratedExpr3 = Math.sin(varX);
console.log(`Integration of cos(x): ${integratedExpr3}`);

// Number of program 9
let functionF = Math.exp(varX);
let differentialEquation = Math.pow(functionF, 2) + 9 * functionF;
console.log(differentialEquation);

// Number of program 10
let varX, varY, varZ;
let coefficientMatrix = [
  [3, 7, -12],
  [4, -2, -5]
];
let constants = [0, 0];

for (let i = 0; i < coefficientMatrix.length; i++) {
  for (let j = 0; j < coefficientMatrix[i].length; j++) {
    console.log(coefficientMatrix[i][j]);
  }
}

console.log(`x = ${constants[0]}`);
console.log(`y = ${constants[1]}`);
