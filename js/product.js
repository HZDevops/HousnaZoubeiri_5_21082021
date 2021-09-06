//Get URL query string
const queryStringUrlId = window.location.search

// Id extraction
const urlSearchParams = new URLSearchParams(queryStringUrlId)

const itemId = urlSearchParams.get('id')

// Function to display item details on product page when item is selected
function addItemToHtml (item) {
  const itemHtmlContainer = document.getElementById('teddy-card')

  itemHtmlContainer.innerHTML += `
      <img src="${ item.imageUrl }" alt="teddy-photo"/>
      <h3>${ item.name }</h3>
      <p>${ item.description }</p>
      <span>Prix:${ item.price / 100 } €</span>
    `
  // Display item's options
  item.colors.forEach(function (color) {
    const itemColorsSelect = document.getElementById('teddy-colors-select')
    const colorOption = document.createElement('option')
    itemColorsSelect.appendChild(colorOption).innerHTML += color
  })
}

// Function to get and save items in localStorage
function addItemToLocalStorage (item) {
  const shoppingCart = getFromLocalStorage('orinoco-shopping-cart')

  if (!shoppingCart) {
    saveToLocalStorage('orinoco-shopping-cart', [item])
  } else {
    shoppingCart.push(item)
    saveToLocalStorage('orinoco-shopping-cart', shoppingCart)
  }
}

// Get selected item data
fetch(`http://localhost:3000/api/teddies/${itemId}`)
  .then(function (response) {
    if (response.ok) {
      return response.json()
    }
  })
  .then(function (data) {
    const item = data

    // Make item HTML card
    addItemToHtml(item)

    // Add item on shopping-cart
    const form = document.getElementById('add-to-cart-form')
    form.addEventListener('submit', function () {
      const itemColorsSelect = document.getElementById('teddy-colors-select')
      const itemQuantity = document.getElementById('quantity').value

      const selectedItem = { ...item, quantity: itemQuantity, option: itemColorsSelect.value }
      // Add item in localStorage
      addItemToLocalStorage(selectedItem)
      alert('L\'article a été ajouté au panier')
    })
  })
