import { useState, useEffect } from 'react'

function useOnlineStatus() {
  // Inicializa el estado de conexión
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Efecto para escuchar cambios en el estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Agrega los listeners para los eventos "online" y "offline"
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Limpia los listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

export default useOnlineStatus
