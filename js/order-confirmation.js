// Get order information from local Storage
const orderInfo = getFromLocalStorage('orinoco-order-info');

//Display order Id and total amount on the order confirmation page 
function addOrderInfoToHtml(order) {
  const orderHtmlContainer = document.getElementById('order-info');
  const shoppingCartAmountHtml = getFromLocalStorage('shopping-cart-amount');
 
  orderHtmlContainer.innerHTML += `
      <h3>Numéro de commande: ${order.orderId}</h3>
      <h3>Montant total de votre commande: ${shoppingCartAmountHtml} €</h3>
      `;
}

// Post order information to server to get order Id
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
    addOrderInfoToHtml(orderConfirmation);
  })
