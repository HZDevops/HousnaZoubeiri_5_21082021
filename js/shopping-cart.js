// Get item selected products in local Storage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart')
//console.log(itemLocalStorage);

// Display item from localStorage to shopping-cart page
const itemListInHtml = document.getElementById('teddy-storage');
const itemTotalPrice = [];
const itemQuantity = [];

if (shoppingCart) {
  shoppingCart.forEach(function (item) {
    itemListInHtml.innerHTML += `
      <div class="teddy-ordered">
        <img src="${item.imageUrl}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${item.name}</h3>
          <p>Couleur: ${item.option}</p>
          <span>Quantité: ${item.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${item.price / 100}€</span>
      </div>
    `;

    itemTotalPrice.push(item.price / 100);
    itemQuantity.push(item.quantity);
  });

  //Calculate and display the amount of the shopping-cart
  let shoppingCartAmount = 0;
  for (let i = 0; i < itemTotalPrice.length; i++) {
    shoppingCartAmount += itemTotalPrice[i] * itemQuantity[i];
  }
  document.getElementById('shopping-cart-amount').textContent = `Montant total : ${shoppingCartAmount}€`;
}

const form = document.getElementById('orinoco-form')
form.addEventListener('submit', function (e) {
  //Put form values in object and send to localStorage
  const contact = {
    lastName: document.getElementById('customer-last-name').value,
    FirstName: document.getElementById('customer-first-name').value,
    address: document.getElementById('customer-address').value,
    city: document.getElementById('customer-city').value,
    email: document.getElementById('customer-email').value,
  };

  const payload = { contact, products: shoppingCart }

  // Post datas for order to server
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res.json);
  });
});
