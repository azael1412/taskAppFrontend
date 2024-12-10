/**
 * It takes a key and a value, and saves the value to local storage
 * @param {string} key - string - The key to store the value under
 * @param {T} value - The value to be stored in local storage.
 */
export const setItemLocalStorage = <T>(key: string, value: T) => {
  try {
    // Verificar si el valor es una cadena
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.log('Error al guardar en localStorage:', error);
  }
}

/**
 * Get from local storage by key, parse stored json or if none return initialValue, if error also
 * return initialValue
 * @param {string} key - string - The key of the item you want to get from local storage.
 * @returns The value of the key in local storage.
 */
export const getItemLocalStorage = (key: string) => {
  // const initialValue = {}
  try {
    // Get from local storage by key
    return localStorage.getItem(key)
    // Parse stored json or if none return initialValue
    // return item ? JSON.parse(item) : initialValue
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    // return initialValue
  }
}

/**
 * It removes an item from local storage
 * @param {string} key - string - The key of the item you want to remove from local storage.
 */
export const removeItemLocalStorage = (key: string) => {
  try {
    // remove to local storage
    localStorage.removeItem(key)
  } catch (error) {
    // A more advanced implementation would handle the error case
    console.log(error)
  }
}
