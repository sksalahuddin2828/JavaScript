function areArraysEqual(array1, array2) {
  const length1 = array1.length;
  const length2 = array2.length;

  if (length1 !== length2) {
    return false;
  }

  // Sort both arrays
  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);

  // Linearly compare elements
  for (let i = 0; i < length1; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If all elements are the same
  return true;
}

const array1 = [3, 5, 2, 5, 2];
const array2 = [2, 3, 5, 5, 2];

if (areArraysEqual(array1, array2)) {
  console.log("The arrays are equal");
} else {
  console.log("The arrays are not equal");
}
