let array = [1, 2, 3, 4];
let length = 1 << array.length;

for (let varValue = 0; varValue < length; varValue++) {
  let number = varValue;
  let position = 0;
  let storeArray = [];
  
  while (number !== 0) {
    if (number & (1 << 0)) {
      storeArray.push(array[position]);
    }
    number = number >> 1;
    position = position + 1;
  }
  
  console.log(storeArray);
}
