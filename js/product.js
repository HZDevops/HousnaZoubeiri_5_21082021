const addToCartButton = document.getElementById('add-to-cart-form');
const popUpInHtml = document.getElementById('pop-up');
const popUpCross = document.getElementsByClassName('close')[0];

//Get an item id from URL query string
function getItemIdFromUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const itemIdInUrl = urlSearchParams.get('id');
  return itemIdInUrl;
}

// Display an item details on product page
function displayItemOnHtml(item) {
  const itemHtmlContainer = document.getElementById('teddy-card');

  itemHtmlContainer.innerHTML += `
      <img src="${item.imageUrl}" alt="teddy-photo"/>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>Prix: ${item.price / 100} €</span>
    `;
  item.colors.forEach(function (option) {
    const itemOptionsSelectHtml = document.getElementById(
      'teddy-colors-select'
    );
    const itemOptionHtml = document.createElement('option');
    itemOptionsSelectHtml.appendChild(itemOptionHtml).innerHTML += option;
  });
}

// Add a new item in shopping-cart
function addItemToShoppingCart(item) {
  const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');

  if (!shoppingCart) {
    saveToLocalStorage('orinoco-shopping-cart', [item]);
  } else {
    shoppingCart.push(item);
    saveToLocalStorage('orinoco-shopping-cart', shoppingCart);
  }
}

//Display a pop-up when user add an item in shopping-cart
function displayPopUp() {
  popUpInHtml.style.display = 'block';
  popUpCross.addEventListener('click', function (e) {
    e.preventDefault();
    popUpInHtml.style.display = 'none';
    window.location = 'index.html';
  });
  window.addEventListener('click', function (e) {
    if (e.target === popUpInHtml) {
      popUpInHtml.style.display = 'none';
      window.location = 'index.html';
    }
  });
}

const itemId = getItemIdFromUrl();

//Get an item from server before displaying it with displayItemOnHtml and adding to shopping-cart
function onPageLoaded() {
  fetch(`http://localhost:3000/api/teddies/${itemId}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      item = data;

      displayItemOnHtml(item);

      // Add item in shopping-cart
      addToCartButton.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemOptionsSelect = document.getElementById(
          'teddy-colors-select'
        );
        const itemQuantity = document.getElementById('quantity').value;

        const selectedItem = {
          ...item,
          quantity: itemQuantity,
          option: itemOptionsSelect.value,
        };
        addItemToShoppingCart(selectedItem);
        displayPopUp();
      });
    })
    .catch(function (error) {
      document.getElementById('error-message').innerText =
        'Produit inaccessible';
    });
}

onPageLoaded();
