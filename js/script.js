  fetch('http://localhost:3000/api/teddies/')
  .then(function (response) {
    if (response.ok) {
    return response.json();
    }
   })
  .then(function (data) {
    const itemsforSale = data
    const itemListUl = document.getElementById('teddy-list')

    itemsforSale.forEach(function (item) {
      itemListUl.innerHTML += `
        <a href="product.html?id=${item._id}" class="product-card">
          <img src="${item.imageUrl}" alt="teddy"/>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span>${item.price/100} €</span>
        </a>
      `
    })
  })

  .catch(function (error) {
    // Une erreur est survenue
    document.getElementById("error-message").innerText = "Produit inaccessible"
  });
  