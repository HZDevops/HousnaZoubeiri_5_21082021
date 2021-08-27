//Getting URL query string
const queryStringUrlId = window.location.search;
//console.log(queryStringUrlId)

// Id extraction
const urlSearchParams = new URLSearchParams (queryStringUrlId)
//console.log(urlSearchParams)

const teddyId = urlSearchParams.get("id")
//console.log(teddyId)

// Getting Selected Teddy data 
fetch (`http://localhost:3000/api/teddies/${teddyId}`)
.then(function (response) {
  if (response.ok) {
  return response.json();
    }
  })
  .then(function(data) {
    const teddyObject = data
    console.log(teddyObject)

  // Displaying Selected Teddy in product.html
  const teddySelected = document.getElementById('teddy-selected')
    
  teddySelected.innerHTML += `
    <img src="${teddyObject.imageUrl}" alt="teddy"/>
    <h3>${teddyObject.name}</h3>
    <p>${teddyObject.description}</p>
    <span>Prix:${teddyObject.price/100} €</span>
    `
    // Displaying Teddy's colors choices
  teddyObject.colors.forEach(function (color) {
    const teddyColor = document.getElementById('teddy-color')
    let colorChoice = document.createElement('option')
    teddyColor.appendChild(colorChoice).innerHTML += color
  })
 })

                   
