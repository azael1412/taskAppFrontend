import { stringToSlug } from './string'

/**
 * Abre un Blob (como un PDF) en una nueva pestaña del navegador.
 *
 * @param blob - El archivo Blob que contiene el PDF.
 */
export const openBlobInNewTab = (blob: Blob) => {
  const url = window.URL.createObjectURL(blob)
  window.open(url, '_blank') // Abre el PDF en una nueva pestaña
}

/**
 * Descarga un Blob (como un PDF) en el dispositivo.
 *
 * @param blob - El archivo Blob que contiene el PDF.
 * @param fileName - El nombre con el que se descargará el archivo.
 */
export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', stringToSlug(fileName) + '.pdf') // Establece el nombre del archivo
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) // Limpia el enlace después de hacer clic
}
