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
function buy(id) {
  let productFind = products.find((product) => product.id === id); //troba el primer producte que coincideixi amb la id

  if (cart.indexOf(productFind) === -1) {
    //de l'array cart busquem el primer index si coincideix amb -1 no es troba
    productFind.quantity = 1; // iniciem producte
    cart.push(productFind); //afegim producte
    count++;
  } else {
    productFind.quantity++;
    count++;
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
  }
  applyPromotionsCart();
  printCart();
}

// Exercise 2
function cleanCart() {
  let confirmation = confirm("Are you sur you want to empty the cart?");
  if (confirmation) {
    cart = []; //buidem el carro
    count = 0; //comptador a 0
    printCart();
  } else {
    alert("Nothing has been emptied");
  }
}

// Exercise 3

function calculateTotal() {
  let totalPrice = 0;

  for (let product of cart) {
    // iterem els productes del cart
    totalPrice += product.subtotalWithDiscount; //afegim al total acumulat, el preu amb descompte del nou article
  }
  return totalPrice.toFixed(2); // retallem a dos decimals
}

// Calculate total price of the cart using the "cartList" array

// Exercise 4
function applyPromotionsCart() {
  for (let product of cart) {
    // itera l'item product de l'array cart
    let totalPriceProduct = product.price * product.quantity; // multipliquem el preu i la quantitat del prod. per saber el preu
    if (product.offer) {
      //si té un camp offer
      if (product.quantity >= product.offer.number) {
        // i la quantitat es més gran o igual al numero minim per oferta
        product.subtotalWithDiscount =
          totalPriceProduct - totalPriceProduct * (product.offer.percent / 100); //resta el tant per cent que digui el camp percent dividint-lo per 100
      } else {
        product.subtotalWithDiscount = totalPriceProduct; // sinó deixa'l sense descompte
      }
    } else {
      product.subtotalWithDiscount = totalPriceProduct; // sinó deixa'l sense descompte
    }
  }
}

// Apply promotions to each item in the array "cart"

// Exercise 5

function printCart() {
  const cartList = document.getElementById("cart_list"); // agafem la id del body de la taula on afegirem l'html dinàmic
  cartList.innerHTML = ""; //buido cart list

  cart.forEach((product) => {
    // iterem amb el forEach
    let content = document.createElement("tr"); // creem la fila
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

  // Fill the shopping cart modal manipulating the shopping cart dom
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
