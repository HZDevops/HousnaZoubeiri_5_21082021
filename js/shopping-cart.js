// Get items in local Storage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');

// Display items on shopping-cart page if items in localStorage
const itemListInHtml = document.getElementById('teddy-shopping-cart');
const itemTotalPrice = [];
const itemQuantity = [];
const products = [];

// Display message if shopping-cart empty
if (!shoppingCart) {
  const emptyCart = document.createElement('p');
  itemListInHtml.appendChild(emptyCart);
  emptyCart.textContent = 'Votre panier est vide !';

  //Display items if shopping cart full
} else {
  shoppingCart.forEach(function (item) {
    itemListInHtml.innerHTML += `
      <div class="teddy-cart" id="${item._id}">
        <img src="${item.imageUrl}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${item.name}</h3>
          <p>Couleur: ${item.option}</p>
          <span>Quantité: ${item.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${
          (item.price * item.quantity) / 100
        }€</span>
        <button class="garbage-button" id="${
          item._id
        }" title="Supprimer cet article?"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    products.push(item._id);
    itemTotalPrice.push(item.price / 100);
    itemQuantity.push(item.quantity);
  });

  //Empty Shopping-Cart
  const btnEmptyShoppingCartInHtml = `<button id="empty-cart-button" class="garbage-button" title="Vider le panier?">Vider le panier</button>`;
  itemListInHtml.insertAdjacentHTML('beforeend', btnEmptyShoppingCartInHtml);
  const btnEmptyShoppingCart = document.getElementById('empty-cart-button');
  btnEmptyShoppingCart.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove items in localStorage
    localStorage.removeItem('orinoco-shopping-cart');
    window.location.href = 'shopping-cart.html';
  });
}

//Calculate shopping-cart amount
const shoppingCartAmount = calculateShoppingCartAmount(
  itemTotalPrice,
  itemQuantity
);

//Display the shopping-cart amount on html
const cartAmountInHtml = `<span id="shopping-cart-amount"> Montant total : ${shoppingCartAmount}€</span>`;
itemListInHtml.insertAdjacentHTML('beforeend', cartAmountInHtml);

//Save the shopping-cart amount in localStorage
saveToLocalStorage('shopping-cart-amount', shoppingCartAmount);

//Put form values in object
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
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
