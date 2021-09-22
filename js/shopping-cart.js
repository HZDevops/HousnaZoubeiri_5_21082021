// Get items from localStorage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');
const itemListInHtml = document.getElementById('teddy-shopping-cart');
const itemTotalPrice = [];
const itemQuantity = [];
const products = [];

// Display item(s) on shopping-cart page if items in localStorage
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

displayShoppingCart();
const shoppingCartAmount = calculateShoppingCartAmount(
  itemTotalPrice,
  itemQuantity
);

//Display the shopping-cart amount
const cartAmountInHtml = document.getElementById('shopping-cart-amount');
cartAmountInHtml.innerText = `Montant total : ${shoppingCartAmount}€`;

//Empty shopping-cart
const EmptyShoppingCartButton = document.getElementById('garbage-button');
EmptyShoppingCartButton.addEventListener('click', function (e) {
  localStorage.removeItem('orinoco-shopping-cart');
  window.location.href = 'shopping-cart.html';
});

//Put shopping-cart form values in an object and send to server for getting order Id if shopping-cart not empty
function sendShoppinCartToServer() {
  const form = document.getElementById('contact-form');
  const shoppingCartSendButton = document.getElementById('send-btn');

  if (shoppingCartAmount === 0) {
    shoppingCartSendButton.disabled = true;
  } else {
    shoppingCartSendButton.disabled = false;

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
            window.location =
              'order-confirmation.html?orderid=' +
              `${orderConfirmation.orderId}` +
              '&montant=' +
              `${shoppingCartAmount}`;
          })
          .catch(function (error) {
            document.getElementById('error-message').innerText =
              'Serveur momentanémment indisponible';
          });
      }
      getOrderId(payload);
    });
  }
}

sendShoppinCartToServer();
