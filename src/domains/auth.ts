import jwtDecode from 'jwt-decode'
import daysjs from 'dayjs'
import history from '../modules/store/history'

interface JwtDecoded {
  exp: number
  user_claims: {
    id: string
    name: string
    role: string
  }
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token') || ''
}

export const logout = () => {
  localStorage.removeItem('token')
  history.push('/login')
}

export const checkLogin = () => {
  try {
    const token = getToken()
    const decoded: JwtDecoded = jwtDecode(token)
    const expire = daysjs(decoded.exp * 1000)
    return expire.isAfter(daysjs())
  } catch (e) {
    return false
  }
}

export const getUserClaims = () => {
  const token = getToken()

  try {
    if (!token) {
      throw new Error('token not found.')
    }

    const decoded: JwtDecoded = jwtDecode(token)

    if (!decoded.user_claims) {
      throw new Error('token is broken.')
    }

    return decoded.user_claims
  } catch (e) {
    return { id: '', name: 'No Name', role: '' }
  }
}

export const getUserRole = () => getUserClaims().role

export const isAdmin = () => getUserRole() === 'admin'

export const isParent = () => getUserRole() === 'parent'

export const getUserId = () => getUserClaims().id
