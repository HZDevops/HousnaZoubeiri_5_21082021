//Display order Id and total amount on the order confirmation page
function addOrderInfoToHtml() {
  const orderHtmlContainer = document.getElementById('order-info');
  //const orderIdForHtml = getFromLocalStorage('orinoco-order-info');
  const shoppingCartAmountHtml = getStringFromUrl();
  console.log(shoppingCartAmountHtml);

  orderHtmlContainer.innerHTML += `
      <h3>Numéro de commande: ${orderIdForHtml.orderId}</h3>
      <h3>Montant total de votre commande: ${shoppingCartAmountHtml} €</h3>
      `;
}

addOrderInfoToHtml();