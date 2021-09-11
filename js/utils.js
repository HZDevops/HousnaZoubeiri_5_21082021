/**
 * Get Id product from URL query string
 * @returns {string} productId
 */
function getProductIdFromUrl(){ 
const queryStringUrlId = window.location.search
 const urlSearchParams = new URLSearchParams(queryStringUrlId)
 const productId = urlSearchParams.get('id')
 return productId;
}
/**
 * Save an item to local storage
 * @param {string} key
 * @param {Array} value
 **/
function saveToLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item from local storage
 * @param {string} key 
 * @returns {Array}
 */
function getFromLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key));
}
