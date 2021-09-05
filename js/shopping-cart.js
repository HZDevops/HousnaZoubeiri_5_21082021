// Get item selected products in local Storage
const itemLocalStorage = JSON.parse(localStorage.getItem('item'));
//console.log(itemLocalStorage);

// Display item from localStorage to shopping-cart page
const itemListInHtml = document.getElementById('teddy-storage');
const itemTotalPrice = [];
const itemQuantity = [];

itemLocalStorage.forEach(function (items) {
  itemListInHtml.innerHTML += `
      <div class="teddy-ordered">
        <img src="${items.imageItem}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${items.nameItem}</h3>
          <p>Couleur: ${items.option}</p>
          <span>Quantité: ${items.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${items.priceItem / 100}€</span>
      </div>
    `;
   
  itemTotalPrice.push(JSON.parse(`${items.priceItem / 100}`));
  itemQuantity.push(JSON.parse(`${items.quantity}`));
});

//Calculate and display the amount of the shopping-cart
let shoppingCartAmount = 0;
for (let i = 0; i < itemTotalPrice.length; i++) {
  shoppingCartAmount += itemTotalPrice[i] * itemQuantity[i];
}
document.getElementById(
  'shopping-cart-amount'
).textContent = `Montant total : ${shoppingCartAmount}€`;

const addFormButton = document.getElementById('send-form-btn');
addFormButton.addEventListener('click', function (e) {
  e.preventDefault();
  //Put form values in object and send to localStorage
  const customerContact = {
    lastName: document.getElementById('customer-last-name').value,
    FirstName: document.getElementById('customer-first-name').value,
    address: document.getElementById('customer-address').value,
    city: document.getElementById('customer-city').value,
    email: document.getElementById('customer-email').value,
  };
  const contact = {
    customerContact,
    itemLocalStorage,
  };
  console.log(contact);

  // Post datas for order to server
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerContact, itemLocalStorage),
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res.json);
  });
});
