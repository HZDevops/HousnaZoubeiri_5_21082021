//Get Id product from URL query string
const itemId = getProductIdFromUrl();

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

// Function to get and save items in shopping-cart
function addItemToLocalStorage(item) {
  const shoppingCart = getFromLocalStorage('orinoco-shopping-cart');

  if (!shoppingCart) {
    saveToLocalStorage('orinoco-shopping-cart', [item]);
  } else {
    shoppingCart.push(item);
    saveToLocalStorage('orinoco-shopping-cart', shoppingCart);
  }
}

// Get selected item data
fetch(`http://localhost:3000/api/teddies/${itemId}`)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    const item = data;

    // Make item HTML card
    addItemToHtml(item);

    // Add item on shopping-cart
    const form = document.getElementById('add-to-cart-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const itemOptionsSelect = document.getElementById('teddy-colors-select');
      const itemQuantity = document.getElementById('quantity').value;

      const selectedItem = {
        ...item,
        quantity: itemQuantity,
        option: itemOptionsSelect.value,
      };
      // Add item in localStorage
      addItemToLocalStorage(selectedItem);
    });
  });
