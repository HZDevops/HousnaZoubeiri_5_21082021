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
  
  const teddySelected = document.getElementById(`${teddyId}`)
  console.log(teddySelected)
  })
 /* teddySelected.addEventListener('click', function(){
      teddySelected.innerHTML += `
          <img src="${teddyObject.imageUrl}" alt="teddy" />
          <h3>${teddyObject.name}</h3>
          <p>${teddyObject.description}</p>
          <span>${teddyObject.price} €</span>
     `
    })
  })*/
                   
