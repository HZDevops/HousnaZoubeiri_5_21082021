//Call API for fetching resources
fetch('http://localhost:3000/api/teddies/')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  //Get from API an array of product objects
  .then(function (data) {
    const itemsforSale = data;

    const itemListUl = document.getElementById('teddy-list');

    //Display items details on index.html
    itemsforSale.forEach(function (item) {
      itemListUl.innerHTML += `
      <a href="product.html?id=${item._id}" class="product-card">
        <img src="${item.imageUrl}" alt="teddy"/>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span>${item.price / 100} €</span>
      </a>
    `;
    });
  })
 // Display error message information when promise before rejected
  .catch(function (error) {
       document.getElementById('error-message').innerText = 'Produit inaccessible';
<<<<<<< HEAD
  });
=======
  });
>>>>>>> 8d002315830a98de0d1ef1bb13951cdcce270ff5
