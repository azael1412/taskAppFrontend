import { USER_EXPIRES_IN, USER_KEY } from '@/constants';
import { getItemLocalStorage } from './localStorage';

export function isAuthenticated() {
  const token = getItemLocalStorage(USER_KEY);
  const expiresAt = getItemLocalStorage(USER_EXPIRES_IN);

  if (!token || !expiresAt) return false; // Verificación inicial

  try {
    const currentTokenDate = new Date(expiresAt);
    const currentTime = new Date().getTime();
    const timeRemainingMs = currentTokenDate.getTime() - currentTime;
    const minutesRemaining = timeRemainingMs / (1000 * 60);

    if (minutesRemaining <= 0) {
      console.log('El token ha caducado.');
      return false;
    }

    // Si quedan menos de 5 minutos, puedes disparar la acción de renovación del token aquí
    return true;

  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
    return false;
  }
}
