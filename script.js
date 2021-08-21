fetch('http://localhost:3000/api/teddies/')
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (responseData) {
   // Displaying Teddy One product
   let teddyOne = document.getElementById ('teddy-one');
   teddyOne.innerHTML = '<h3>' + responseData[0].name +'</h3>'+'<img src="'+ responseData[0].imageUrl +'"alt= ></img>' + '<p>' + responseData[0].description +'</p>' +'<span>' + responseData[0].price + '</span>';
  
   let teddyTwo = document.getElementById ('teddy-two');
   teddyTwo.innerHTML = '<h3>' + responseData[1].name +'</h3>'+'<img src="'+ responseData[1].imageUrl +'"alt= ></img>' + '<p>' + responseData[1].description +'</p>' +'<span>' + responseData[1].price + '</span>';
 
   let teddyThree = document.getElementById ('teddy-three');
   teddyThree.innerHTML = '<h3>' + responseData[2].name +'</h3>'+'<img src="'+ responseData[2].imageUrl +'"alt= ></img>' + '<p>' + responseData[2].description +'</p>' +'<span>' + responseData[2].price + '</span>';
  
   let teddyFour = document.getElementById ('teddy-four');
   teddyFour.innerHTML = '<h3>' + responseData[3].name +'</h3>'+'<img src="'+ responseData[3].imageUrl +'"alt= ></img>' + '<p>' + responseData[3].description +'</p>' +'<span>' + responseData[3].price + '</span>';
   
   let teddyFive = document.getElementById ('teddy-five');
   teddyFive.innerHTML = '<h3>' + responseData[4].name +'</h3>'+'<img src="'+ responseData[4].imageUrl +'"alt= ></img>' + '<p>' + responseData[4].description +'</p>' +'<span>' + responseData[4].price + '</span>';
  
  })

  .catch(function(error) {
    // Une erreur est survenue
    document.getElementById("error-message").innerText = "Produit inaccesible"
  });