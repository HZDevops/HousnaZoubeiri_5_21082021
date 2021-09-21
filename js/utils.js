/**
 * Save an item to localStorage
 * @param {string} key
 * @param {Array} value
 **/
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item from localStorage
 * @param {string} key
 * @returns {Array}
 */
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
