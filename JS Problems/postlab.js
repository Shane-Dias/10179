const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Smartphone", price: 500 },
  { id: 3, name: "Tablet", price: 300 },
  { id: 4, name: "Smartwatch", price: 200 },
  { id: 5, name: "Headphones", price: 100 },
];

function displayProducts(productList) {
  console.log("Product List:");
  productList.forEach((product) => {
    console.log(
      `ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`
    );
  });
}

function filterProducts(minPrice) {
  const filteredProducts = products.filter(
    (product) => product.price >= minPrice
  );
  console.log(`\nProducts with price >= $${minPrice}:`);
  displayProducts(filteredProducts);
}

displayProducts(products);

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter the minimum price: ", (input) => {
  const userMinPrice = parseFloat(input);
  if (!isNaN(userMinPrice)) {
    filterProducts(userMinPrice);
  } else {
    console.log("Please enter a valid number.");
  }
  readline.close();
});
