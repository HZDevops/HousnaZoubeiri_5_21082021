//Get URL query string
const queryStringUrlId = window.location.search;

// Id extraction
const urlSearchParams = new URLSearchParams(queryStringUrlId);

const itemId = urlSearchParams.get('id');

// Function to display item details on product page when item is selected
function addItemToHtml(item) {
  const itemHtmlContainer = document.getElementById('teddy-card');

  itemHtmlContainer.innerHTML += `
      <img src="${item.imageUrl}" alt="teddy-photo"/>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span>Prix:${item.price / 100} €</span>
    `;
  // Display item's options
  item.colors.forEach(function (color) {
    const itemColorsSelect = document.getElementById('teddy-colors-select');
    const colorOption = document.createElement('option');
    itemColorsSelect.appendChild(colorOption).innerHTML += color;
  });
}

// Function to get and save items in localStorage
function addItemToLocalStorage(item) {
  const itemInLocalStorage = JSON.parse(localStorage.getItem('item'));

  if (itemInLocalStorage) {
    itemInLocalStorage.push(item);
    localStorage.setItem('item', JSON.stringify(itemInLocalStorage));
  } else {
    const itemInLocalStorage = [];
    itemInLocalStorage.push(item);
    localStorage.setItem('item', JSON.stringify(itemInLocalStorage));
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
    const addItemButton = document.getElementById('add-item-btn');
    addItemButton.addEventListener('click', function () {
      const itemColorsSelect = document.getElementById('teddy-colors-select');
      const itemNumber = document.getElementById('teddy-number').value;

      if (!itemNumber || itemNumber == 0) {
        alert('Veuillez renseigner la quantité de produits');
        return false;
      } else {
        const selectedItem = {
          item,
          quantity: itemNumber,
          option: itemColorsSelect.value,
        };

        // Add item in localStorage
        addItemToLocalStorage(selectedItem);
        alert("L'article a été ajouté au panier");
      }
    });
  });
