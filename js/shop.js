// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity
// field to define its quantity, so these products are not repeated.

let cart = [];
let count = 0;

// Exercise 1
// 1. Loop for to the array products to get the item to add to cart
// 2. Add found product to the cart array

function buy(id) {
  let productFind = products.find((product) => product.id === id);

  if (cart.indexOf(productFind) === -1) {
    productFind.quantity = 1;
    cart.push(productFind);
    count++;
  } else {
    productFind.quantity++;
    count++;
  }
  applyPromotionsCart();
  printCart();
}

// Exercise 2

function cleanCart() {
  let confirmation = confirm("Are you sur you want to empty the cart?");
  if (confirmation) {
    cart = [];
    count = 0;
    printCart();
  } else {
    alert("Nothing has been emptied");
  }
}

// Exercise 3
// Calculate total price of the cart using the "cartList" array

function calculateTotal() {
  let totalPrice = 0;

  for (let product of cart) {
    totalPrice += product.subtotalWithDiscount;
  }
  return totalPrice.toFixed(2);
}

// Exercise 4
// Apply promotions to each item in the array "cart"

function applyPromotionsCart() {
  for (let product of cart) {
    let totalPriceProduct = product.price * product.quantity;
    if (product.offer) {
      if (product.quantity >= product.offer.number) {
        product.subtotalWithDiscount =
          totalPriceProduct - totalPriceProduct * (product.offer.percent / 100);
      } else {
        product.subtotalWithDiscount = totalPriceProduct;
      }
    } else {
      product.subtotalWithDiscount = totalPriceProduct;
    }
  }
}

// Exercise 5
// Fill the shopping cart modal manipulating the shopping cart dom

function printCart() {
  const cartList = document.getElementById("cart_list");
  cartList.innerHTML = "";

  cart.forEach((product) => {
    let content = document.createElement("tr");
    content.innerHTML = `
    <th scope = "row">${product.name}</th>
                  <td>${product.price}</td>
                  <td>${product.quantity}</td>
                  <td>${product.subtotalWithDiscount}</td>
                  <td><button type="button" onClick="removeFromCart(${product.id})" class="btn btn-light d-flex justify-content-center"> <i class="fas fa-trash-alt ms-1 me-1"></i> </button></td>
    `;
    cartList.appendChild(content);
  });

  let totalCart = document.getElementById("total_price");
  totalCart.innerHTML = `${calculateTotal()}`;

  let countProduct = document.getElementById("count_product");
  countProduct.innerHTML = `${count}`;
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
  let productIndex = cart.findIndex((product) => product.id === id);
  let product = cart[productIndex];
  if (product.quantity > 1) {
    product.quantity--;
    count--;
    applyPromotionsCart();
    calculateTotal();
  } else {
    cart.splice(productIndex, 1);
    count--;
    applyPromotionsCart();
    calculateTotal();
  }
  printCart();
}

function open_modal() {
  printCart();
}
