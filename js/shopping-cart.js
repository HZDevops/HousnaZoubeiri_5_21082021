// Get item selected products in local Storage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');

// Display item from localStorage to shopping-cart page
const itemListInHtml = document.getElementById('teddy-storage');
const itemTotalPrice = [];
const itemQuantity = [];
const products = [];
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
    products.push(item._id);
    itemTotalPrice.push(item.price / 100);
    itemQuantity.push(item.quantity);
  });

  //Calculate and display the amount of the shopping-cart
  let shoppingCartAmount = 0;
  for (let i = 0; i < itemTotalPrice.length; i++) {
    shoppingCartAmount += itemTotalPrice[i] * itemQuantity[i];
  }
  document.getElementById(
    'shopping-cart-amount'
  ).textContent = `Montant total : ${shoppingCartAmount}€`;
  saveToLocalStorage('shopping-cart-amount', shoppingCartAmount);

}

const form = document.getElementById('orinoco-form');
form.addEventListener('submit', function (e) {
  //Put form values in object
  const contact = {
    firstName: document.getElementById('customer-first-name').value,
    lastName: document.getElementById('customer-last-name').value,
    address: document.getElementById('customer-address').value,
    city: document.getElementById('customer-city').value,
    email: document.getElementById('customer-email').value,
  };
  const payload = { contact, products };
  saveToLocalStorage('orinoco-order-info', payload);
});
