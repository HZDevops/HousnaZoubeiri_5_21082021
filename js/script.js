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

//Call API for fetching resources
function getItems() {
  fetch('http://localhost:3000/api/teddies/')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    //Get from API an array of product objects
    .then(function (data) {
      const itemsData = data;
      displayItems(itemsData);
    })
    // Display error message information when promise before rejected
    .catch(function (error) {
      document.getElementById('error-message').innerText =
        'Produit inaccessible';
    });
}
getItems();
