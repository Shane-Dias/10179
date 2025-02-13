// Q1 Reverse a String
function reverseString() {
  let str = document.getElementById("reverse").value;
  console.log(`String is:${str}`);
  let newStr = str.split("").reverse().join("");
  document.getElementById("result1").value = newStr;
}

// console.log(reverseString("hello"));
// console.log(reverseString("world"));

// Q2 Check for Palindrome
function isPalindrome() {
  let str = document.getElementById("palindrome").value;
  str = str.toLowerCase();
  // return str === str.split("").reverse().join("");
  if (str === str.split("").reverse().join("")) {
    document.getElementById("result2").value = "Ture";
  } else {
    document.getElementById("result2").value = "False";
  }
}

// console.log(isPalindrome("racecar"));
// console.log(isPalindrome("hello"));

//Q3 Find the Largest Number in an Array
function findLargest() {
  let arr = document.getElementById("largestEle").value;
  let numArr = arr.split(",").map(Number); 
  let largest = Math.max(...numArr); 
  document.getElementById("result3").value = "Largest number: " + largest;
}
