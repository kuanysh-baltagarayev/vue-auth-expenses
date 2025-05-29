import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token)
    const now = Date.now() / 1000 // в секундах
    return exp < now
  } catch {
    return true // если токен невалиден — считаем просроченным
  }
}

export function logout() {
  localStorage.removeItem('token')
}
