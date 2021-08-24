  fetch('http://localhost:3000/api/teddies/')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    const teddies = data
    const teddyListUl = document.getElementById('teddy-list')

       // Version avec le forEach
    teddies.forEach(function (teddy) {
      teddyListUl.innerHTML += `
        <a class="product-card">
          <img src="${teddy.imageUrl}" alt="teddy" />
          <h3>${teddy.name}</h3>
          <p>${teddy.description}</p>
          <span>${teddy.price} €</span>
        </a>
      `
    })
  })

  .catch(function (error) {
    // Une erreur est survenue
    document.getElementById("error-message").innerText = "Produit inaccessible"
  });
  