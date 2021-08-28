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
    // Displaying Teddy's colors
    teddyObject.colors.forEach(function (color) {
    const teddyColor = document.getElementById('teddy-color')
    let colorChoice = document.createElement('option')
    teddyColor.appendChild(colorChoice).innerHTML += color
  })

  // Getting Teddy's otption color
  const teddyColor = document.getElementById('teddy-color')
  const teddyCustomized = teddyColor.value
  //console.log(teddyCustomized)

  // Getting Teddy's selected data for shopping-cart
  const sendButton = document.getElementById("send-btn")
  sendButton.addEventListener('click', function(event) {
    event.preventDefault()
   
    let teddyAddToCart = {
     imageProduct : teddyObject.imageUrl,
     nomProduct : teddyObject.name,
     OptionProduct : teddyColor.value,
     quantity: 1,
     productPrice : teddyObject.price/100,
   }
  console.log(teddyAddToCart)
 })

})

 
 
