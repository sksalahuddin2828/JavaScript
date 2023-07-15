function isPalindrome(s) {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return s === s.split('').reverse().join('');
}

const user_input = prompt("Enter a string:");
if (isPalindrome(user_input)) {
    console.log(`'${user_input}' is a palindrome.`);
} else {
    console.log(`'${user_input}' is not a palindrome.`);
}

//--------------------------------------------------------------

function isPalindrome(s) {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return s === s.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));  

// Output: true
