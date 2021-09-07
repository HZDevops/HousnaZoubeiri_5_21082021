// Get order information from local Storage
const orderInfo = getFromLocalStorage('orinoco-order-info');

// Post order information to server to order confirmation and Id
fetch('http://localhost:3000/api/teddies/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderInfo),
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    const orderConfirmation = data;
    console.log(orderConfirmation);
  });
