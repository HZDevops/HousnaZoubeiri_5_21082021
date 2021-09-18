/**
 * Get string of characters from URL query string
 * @returns {string}
 */
function getStringFromUrl(id) {
  const queryStringUrl = window.location.search;
  const urlSearchParams = new URLSearchParams(queryStringUrl);
  const stringToGet = urlSearchParams.get('id');
  return stringToGet;
}
/**
 * Save an item to local storage
 * @param {string} key
 * @param {Array} value
 **/
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item from local storage
 * @param {string} key
 * @returns {Array}
 */
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
