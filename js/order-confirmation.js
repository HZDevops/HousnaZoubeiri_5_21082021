//Display order Id and total amount on the order confirmation page
function displayOrderInfoToHtml() {
  const orderHtmlContainer = document.getElementById('order-info');
  const shoppingCartAmountHtml = getStringFromUrl();

  const orderIdForHtml = getFromLocalStorage('orinoco-order-info');
  orderHtmlContainer.innerHTML += `
      <h3>Numéro de commande: ${orderIdForHtml.orderId}</h3>
      <h3>Montant total de votre commande: ${shoppingCartAmountHtml} €</h3>
      `;
}

displayOrderInfoToHtml();
//localStorage.clear();
