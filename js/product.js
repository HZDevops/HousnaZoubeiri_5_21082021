const AddToCartButton = document.getElementById('add-to-cart-form');
const popUpInHtml = document.getElementById('pop-up');
const popUpCross = document.getElementsByClassName('close')[0];

//Get item id from URL query string
const itemIdInUrl = getStringFromUrl();

// Display item details on product page when item is selected
function addItemToHtml(item) {
  const itemHtmlContainer = document.getElementById('teddy-card');

  itemHtmlContainer.innerHTML += `
      <img src="${item.imageUrl}" alt="teddy-photo"/>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>Prix: ${item.price / 100} €</span>
    `;
  // Display item's options
  item.colors.forEach(function (option) {
    const itemOptionsSelectHtml = document.getElementById(
      'teddy-colors-select'
    );
    const itemOptionHtml = document.createElement('option');
    itemOptionsSelectHtml.appendChild(itemOptionHtml).innerHTML += option;
  });
}

// Add a new item in localStorage
function addItemToLocalStorage(item) {
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
  });
  window.addEventListener('click', function (e) {
    if (e.target === popUpInHtml) {
      popUpInHtml.style.display = 'none';
    }
  });
}

function addItemToCart() {
  fetch(`http://localhost:3000/api/teddies/${itemIdInUrl}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      item = data;

      // Make item HTML card
      addItemToHtml(item);

      // Add item in shopping-cart
      AddToCartButton.addEventListener('submit', function (e) {
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
        addItemToLocalStorage(selectedItem);
        displayPopUp();
      });
    })
    .catch(function (error) {
      document.getElementById('error-message').innerText =
        'Serveur momentanémment indisponible';
    });
}
