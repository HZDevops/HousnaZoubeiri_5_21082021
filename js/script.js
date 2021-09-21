//Display items on index.html
function displayItems(itemsForSale) {
  const itemListUl = document.getElementById('teddy-list');
  itemsForSale.forEach(function (item) {
    itemListUl.innerHTML += `
<a href="product.html?id=${item._id}" class="product-card">
  <img src="${item.imageUrl}" alt="teddy"/>
  <h3>${item.name}</h3>
  <p>${item.description}</p>
  <span>${item.price / 100} €</span>
</a>
`;
  });
}

//Get all items from API
function getItems() {
  fetch('http://localhost:3000/api/teddies/')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      const itemsData = data;
      displayItems(itemsData);
    })
    .catch(function (error) {
      document.getElementById('error-message').innerText =
        'Produit inaccessible';
    });
}
getItems();
