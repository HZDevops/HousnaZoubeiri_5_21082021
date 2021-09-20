//Display order Id and total amount on the order confirmation page
function displayOrderInfoToHtml() {
  const orderHtmlContainer = document.getElementById('order-info');
  let urlSearchParams = new URLSearchParams(window.location.search);
  const orderIdForHtml = urlSearchParams.get('orderid');
  shoppingCartAmountHtml = urlSearchParams.get('montant');

  orderHtmlContainer.innerHTML += `
  <h3>Numéro de commande:</br> ${orderIdForHtml}</h3>
  <h3>Montant total de votre commande: ${shoppingCartAmountHtml} €</h3>
  `;
}
displayOrderInfoToHtml();
localStorage.clear();
