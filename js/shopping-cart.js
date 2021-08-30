// Getting Teddys' selected products in local Storage
let teddyStockage = JSON.parse(localStorage.getItem("firstTeddy"));
console.log(teddyStockage)

// Displaying Teddy's local Storage in shopping-cart page
const teddyListStockage = document.getElementById('teddy-storage')
let teddyTotalPrice = [];

teddyStockage.forEach(function (teddy) {
    teddyListStockage.innerHTML += `
      <div class="teddy-ordered">
        <img src="${teddy.imageProduct}" alt="teddy selected by customer" />
        <div class="teddy-info">
          <h3>${teddy.nomProduct}</h3>
          <p>Couleur: ${teddy.OptionProduct}</p>
          <span>Quantité: ${teddy.quantity}</span>
        </div>
        <span class="teddy-price">Prix: ${teddy.productPrice} €</span>
      </div>
    `
    teddyTotalPrice.push(`${teddy.productPrice}`)
  })
//console.log(teddyTotalPrice)

//Converting an array of strings(teddyTotalPrice) to an array of numbers
const teddyTotalPriceNumber = teddyTotalPrice.map((i) => Number(i));
console.log(teddyTotalPriceNumber)

let shoppingCartTotalPrice = 0
//Calculating and displaying total price of shopping-cart
for (let i = 0; i <teddyTotalPriceNumber.length; i++) {
  shoppingCartTotalPrice += teddyTotalPriceNumber[i];
}
console.log(shoppingCartTotalPrice);
document.getElementById("teddy-resume").innerHTML = `<h2>Montant total : ${shoppingCartTotalPrice}€</h2>`