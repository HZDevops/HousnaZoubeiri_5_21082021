// Get items in localStorage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');
console.log(shoppingCart);
const itemListInHtml = document.getElementById('teddy-shopping-cart');
const itemTotalPrice = [];
const itemQuantity = [];
const products = [];

//Empty Shopping-Cart
function emptyShoppingCart() {
  const btnEmptyShoppingCartInHtml = `<button id="garbage-button">Vider le panier<i class="fas fa-trash-alt"></i></button>`;
  itemListInHtml.insertAdjacentHTML('beforeend', btnEmptyShoppingCartInHtml);
  const btnEmptyShoppingCart = document.getElementById('garbage-button');
  btnEmptyShoppingCart.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('orinoco-shopping-cart');
    window.location.href = 'shopping-cart.html';
  });
}

// Display items on shopping-cart page if items in localStorage
function displayShoppingCart() {
  if (!shoppingCart) {
    const emptyCart = document.createElement('p');
    itemListInHtml.appendChild(emptyCart);
    emptyCart.textContent = 'Votre panier est vide !';
  } else {
    shoppingCart.forEach(function (item) {
      itemListInHtml.innerHTML += `
      <div class="teddy-cart">
        <img src="${item.imageUrl}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${item.name}</h3>
          <p>Couleur: ${item.option}</p>
          <span>Quantité: ${item.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${
          (item.price * item.quantity) / 100
        }€</span>
      </div>
    `;
      products.push(item._id);
      itemTotalPrice.push(item.price / 100);
      itemQuantity.push(item.quantity);
    });
    emptyShoppingCart();
  }
}

//Calculate shopping-cart amount
function calculateShoppingCartAmount(price, quantity) {
  let totalPrice = 0;
  for (let i = 0; i < price.length; i++) {
    totalPrice += price[i] * quantity[i];
  }
  return totalPrice;
}

//Display the shopping-cart amount on html
function displayCartAmount() {
  const cartAmountInHtml = `<span id="shopping-cart-amount"> Montant total : ${shoppingCartAmount}€</span>`;
  itemListInHtml.insertAdjacentHTML('beforeend', cartAmountInHtml);
}

displayShoppingCart();
const shoppingCartAmount = calculateShoppingCartAmount(
  itemTotalPrice,
  itemQuantity
);
displayCartAmount();

//Put form values in object and send order to server for getting order Id
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const contact = {
    firstName: document.getElementById('customer-first-name').value,
    lastName: document.getElementById('customer-last-name').value,
    address: document.getElementById('customer-address').value,
    city: document.getElementById('customer-city').value,
    email: document.getElementById('customer-email').value,
  };

  const payload = { contact, products };

  // Post order information to server and save server response (order Id) in localStorage
  function getOrderId(orderData) {
    fetch('http://localhost:3000/api/teddies/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        const orderConfirmation = data;
        //localStorage.setItem('orinoco-order-info', orderConfirmation.orderId);
        window.location =
          'order-confirmation.html?orderid=' + `${orderConfirmation.orderId}` + '&montant=' + `${shoppingCartAmount}`;
          //localStorage.removeItem('orinoco-shopping-cart');
      })
      .catch(function (error) {
        document.getElementById('error-message').innerText =
          'Serveur momentanémment indisponible';
      });
  }
  getOrderId(payload);
});
