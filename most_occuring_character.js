function findMostOccChar(string) {
  const charCount = {};

  // Count the occurrence of each character in the string
  for (let char of string) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  let maxCount = 0;
  for (let count of Object.values(charCount)) {
    if (count > maxCount) {
      maxCount = count;
    }
  }

  const mostOccChars = [];
  for (let char in charCount) {
    if (charCount[char] === maxCount) {
      mostOccChars.push(char);
    }
  }

  // Printing the most occurring character(s) and its count
  for (let char of mostOccChars) {
    console.log(`Character: ${char}, Count: ${maxCount}`);
  }
}

// Driver program
const inputString = 'helloworldmylovelypython';
findMostOccChar(inputString);
