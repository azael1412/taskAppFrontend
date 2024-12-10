export function shortName(fullName: string) {
  const names = fullName.split(' ')
  let nameShortened = ''
  for (let i = 0; i < names.length; i++) {
    if (i === names.length - 1) {
      nameShortened += names[i]
    } else {
      nameShortened += names[i].charAt(0) + '.'
    }
  }
  return nameShortened
}

export function zeroFillNumber(number: number, width: number = 10): string {
  const numStr = number.toString()
  if (numStr.length >= width) {
    return numStr // Si la longitud es igual o mayor al ancho deseado, no se realiza el relleno.
  }
  const zeroFill = '0'.repeat(width - numStr.length)
  return zeroFill + numStr
}

/**
 * The function `isValidURL` checks if a given string is a valid URL.
 * @param {string} url - The `url` parameter is a string that represents a URL that needs to be
 * validated.
 * @returns a boolean value.
 */
export function isValidURL(url: string): boolean {
  // Expresión regular para validar una URL
  const regex = /^(ftp|http|https):\/\/[^ "]+$/

  return regex.test(url)
}

/**
 * The function checks if a given string consists of exactly 10 numeric digits.
 * @param {string} str - The parameter "str" is a string that represents a number.
 * @returns a boolean value.
 */
export function isTenDigitNumber(str: string): boolean {
  // Expresión regular para verificar si la cadena tiene exactamente 10 dígitos numéricos
  const regex = /^\d{10}$/

  return regex.test(str)
}

/**
 * The function `stringToSlug` takes a string input, converts it to lowercase, removes special
 * characters, replaces spaces and underscores with hyphens, and trims any leading or trailing hyphens
 * to create a slug.
 * @param {string} str - The `str` parameter in the `stringToSlug` function is a string that you want
 * to convert into a slug format. The function will convert the string to lowercase, remove any special
 * characters except for spaces, hyphens, and underscores, replace spaces and underscores with hyphens,
 * and
 */
export const stringToSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
