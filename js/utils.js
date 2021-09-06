function saveToLocalStorage (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get an item form local storage
 * @param key {string}
 * @returns {Array}
 */
function getFromLocalStorage (key) {
  return JSON.parse(localStorage.getItem(key));
}
