// Get item selected products in local Storage
const itemLocalStorage = JSON.parse(localStorage.getItem('item'));
//console.log(itemLocalStorage);

// Display item from localStorage to shopping-cart page
const itemListInHtml = document.getElementById('teddy-storage');
const itemTotalPrice = [];

itemLocalStorage.forEach(function (items) {
  itemListInHtml.innerHTML += `
      <div class="teddy-ordered">
        <img src="${items.item.imageUrl}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${items.item.name}</h3>
          <p>Couleur: ${items.option}</p>
          <span>Quantité: ${items.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${items.item.price / 100}€</span>
      </div>
    `;
  itemTotalPrice.push(JSON.parse(`${items.item.price / 100}`));
});

//Calculate and display the amount of the shopping-cart
let shoppingCartAmount = 0;
for (let i = 0; i < itemTotalPrice.length; i++) {
  shoppingCartAmount += itemTotalPrice[i];
}
//console.log(shoppingCartAmount);

document.getElementById(
  'shopping-cart-amount'
).textContent = `Montant total : ${shoppingCartAmount}€`;

/*******Check validity form values******/
document.forms['orinocor-form'].addEventListener('submit', function (e) {
  var error;
  var inputs = this;
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      error = 'Veuillez renseigner tous les champs';
    }
  }
  if (error) {
    e.preventDefault();
    document.getElementById('error').innerHTML = error;
    return false;
  } else {
    alert('Formulaire envoyé!');
  }
});

/*Checking validity name value
  function validityName() {
    const nameToCheck = formValues.name;
    if (/^[A-Za-z]{3,30}$/.test(nameToCheck)) {
      return true;
    } else {
      alert('Chiffres et symboles non autorisés \n Saisir 3 à 30 caractères');
      return false;
    }
  }
  Checking city value
  function validityCity() {
    const cityToCheck = formValues.city;
    if (/^[A-Za-z]{3,20}$/.test(cityToCheck)) {
      return true;
    } else {
      alert('Chiffres et symboles non autorisés \n Saisir 3 à 20 caractères');
      return false;
    }
  }
  Checking code zip value
  function validityCodeZip() {
    const codeZipToCheck = formValues.codeZip;
    if (/^[0-9]{5}$/.test(codeZipToCheck)) {
      return true;
    } else {
      alert('Lettres et symboles non autorisés \n Saisir 5 chiffres');
      return false;
    }
  }

  Checking validity form values before putting them in local Storage
  if (validityName() && validityCity() && validityCodeZip()) {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  } else {
    alert('Veuillez bien remplir le formulaire');
  }

  Putting form and shopping-cart products in a object before sending to server
  const sendShoppingCartToServer = {
    teddyStockage,
    formValues,
  };
  //console.log(sendShoppingCartToServer);*/
