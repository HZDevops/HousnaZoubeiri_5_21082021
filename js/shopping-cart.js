// Getting Teddys' selected products in local Storage
let teddyStockage = JSON.parse(localStorage.getItem('firstTeddy'));
console.log(teddyStockage);

// Displaying Teddy's local Storage in shopping-cart page
const teddyListStockage = document.getElementById('teddy-storage');
let teddyTotalPrice = [];

teddyStockage.forEach(function (teddy) {
  teddyListStockage.innerHTML += `
      <div class="teddy-ordered">
        <img src="${teddy.imageProduct}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${teddy.nomProduct}</h3>
          <p>Couleur: ${teddy.OptionProduct}</p>
          <span>Quantité: ${teddy.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${teddy.productPrice} €</span>
      </div>
    `;
  teddyTotalPrice.push(`${teddy.productPrice}`);
});
//console.log(teddyTotalPrice)

//Converting an array of strings(teddyTotalPrice) to an array of numbers
const teddyTotalPriceNumber = teddyTotalPrice.map((i) => Number(i));
console.log(teddyTotalPriceNumber);

let shoppingCartTotalPrice = 0;
//Calculating and displaying total price of shopping-cart
for (let i = 0; i < teddyTotalPriceNumber.length; i++) {
  shoppingCartTotalPrice += teddyTotalPriceNumber[i];
}
console.log(shoppingCartTotalPrice);
document.getElementById(
  'shopping-cart-amount'
).innerHTML = `<p>Montant total : ${shoppingCartTotalPrice}€</p>`;

// Code for shopping-cart form

const teddyFormHtml = document.getElementById('teddy-form');

teddyFormHtml.innerHTML = `
<p>Remplir le formulaire pour valider la commande</p>
<form>
    <div class="form-style">
        <label for="customer-name">Nom et Prénom : </label><br />
        <input type="text" id="customer-name" name="customer-name" placeholder="Ex: Martin Julien" required>
    </div>
    <div class="form-style">
        <label for="customer-address">Adresse de livraison</label><br />
        <input type="text" id="customer-address" name="customer-address" placeholder="Ex: 25 rue des Lilas" required>
    </div>
    <div class="form-style">
        <label for="customer-city">Ville</label><br />
        <input type="text" id="customer-city" name="customer-city" placeholder="Ex: Paris" required>
    </div>
    <div class="form-style">
        <label for="code-zip">Code postal</label><br />
        <input type="text" id="code-zip" name="code-zip" placeholder="Ex: 75020" required>
    </div>
    <div class="form-style">
        <label for="customer-email">Adresse e-mail</label>
        <input type="customer-email" id="customer-email" name="customer-email" placeholder="Ex: monadresse@mail.com" required>
    </div>
</form>
<button id="send-form-btn" type="submit" name="send-btn">Confirmer la commande</button>`;

// Sending shopping-cart form in stockage array before displaying in shopping-cart
const sendButtonForm = document.getElementById('send-form-btn');
//console.log(sendButtonForm)

sendButtonForm.addEventListener('click', function (event) {
  event.preventDefault();

  //Getting form values in an object

  const formValues = {
    name: document.getElementById('customer-name').value,
    address: document.getElementById('customer-address').value,
    city: document.getElementById('customer-city').value,
    codeZip: document.getElementById('code-zip').value,
    email: document.getElementById('customer-email').value,
  };

  //*******Checking validity form values******//

  //Checking validity name value
  function validityName() {
    const nameToCheck = formValues.name;
    if (/^[A-Za-z]{3,30}$/.test(nameToCheck)) {
      return true;
    } else {
      alert('Chiffres et symboles non autorisés \n Saisir 3 à 30 caractères');
      return false;
    }
  }
  //Checking city value
  function validityCity() {
    const cityToCheck = formValues.city;
    if (/^[A-Za-z]{3,20}$/.test(cityToCheck)) {
      return true;
    } else {
      alert('Chiffres et symboles non autorisés \n Saisir 3 à 20 caractères');
      return false;
    }
  }
  //Checking code zip value
  function validityCodeZip() {
    const codeZipToCheck = formValues.codeZip;
    if (/^[0-9]{5}$/.test(codeZipToCheck)) {
      return true;
    } else {
      alert('Lettres et symboles non autorisés \n Saisir 5 chiffres');
      return false;
    }
  }

  //Checking validity form values before putting them in local Storage
  if (validityName() && validityCity() && validityCodeZip()) {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  } else {
    alert('Veuillez bien remplir le formulaire');
  }

  //Putting form and shopping-cart products in a object before sending to server
  const sendShoppingCartToServer = {
    teddyStockage,
    formValues,
  };
  //console.log(sendShoppingCartToServer);
});
