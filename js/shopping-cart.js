// Get item selected products in local Storage
const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');

// Display items on shopping-cart page if items in localStorage
const itemListInHtml = document.getElementById('teddy-shopping-cart');
const itemTotalPrice = [];
const itemQuantity = [];
const products = [];
const idStorage = [];
let i = 0;

if (!shoppingCart) {
  const emptyCart = document.createElement('p');
  itemListInHtml.appendChild(emptyCart);
  emptyCart.textContent = 'Votre panier est vide !';
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
    idStorage.push(i);
    i++;
  });
  
}
console.log(idStorage);
//Calculate shopping-cart amount
const shoppingCartAmount = calculateShoppingCartAmount(
  itemTotalPrice,
  itemQuantity
);

//Display the shopping-cart amount on html and save it in localStorage
const cartAmount = document.createElement('span');
itemListInHtml.appendChild(cartAmount);
cartAmount.id = 'shopping-cart-amount';
cartAmount.textContent = `Montant total : ${shoppingCartAmount}€`;
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
