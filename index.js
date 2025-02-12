// Q1 Reverse a String
function reverseString() {
  let str = document.getElementById("reverse").value;
  console.log(`String is:${str}`)
  let newStr = str.split("").reverse().join("");
  document.getElementById("result1").value = newStr;
}

// console.log(reverseString("hello"));
// console.log(reverseString("world"));

// Q2 Check for Palindrome
function isPalindrome(str) {
  str = str.toLowerCase();
  return str === str.split("").reverse().join("");
}

// console.log(isPalindrome("racecar"));
// console.log(isPalindrome("hello"));

//Q3 Find the Largest Number in an Array
function largestInArray() {
  let arr = [10, 20, 30, 40];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  console.log(max);
}
