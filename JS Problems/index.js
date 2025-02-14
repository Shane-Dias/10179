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

// Q4 Find the First Non-Repeating Character in a String
function findNonRepeating() {
  let str = document.getElementById("nonRepeating").value;
  let charCount = {};

  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let char of str) {
    if (charCount[char] === 1) {
      document.getElementById("result4").value = char;
      return;
    }
  }

  document.getElementById("result4").value = "Not found";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDelay() {
  let ms = document.getElementById("delayInput").value;

  if (ms <= 0 || isNaN(ms)) {
    document.getElementById("output").innerText =
      "Please enter a valid number!";
    return;
  }

  document.getElementById("output").innerText = `Waiting for ${ms} ms...`;
  await delay(ms);
  document.getElementById("output").innerText = `Executed after ${ms} ms!`;
}

function evaluateExpression() {
  try {
    let expression = document.getElementById("expression").value;
    let result = Function(`'use strict'; return (${expression})`)();
    document.getElementById("result").textContent = result;
  } catch (error) {
    document.getElementById("result").textContent = "Invalid Expression";
  }
}
