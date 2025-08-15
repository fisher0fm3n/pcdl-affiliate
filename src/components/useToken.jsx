import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('pcdl_ss.token')
    try {
      const userToken = JSON.parse(tokenString)
      return userToken
    } catch (error) {
      return error
    }
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    if (!JSON.stringify(userToken.body.specialists_id)) {
      window.location.replace('/terms')
    } else {
      localStorage.setItem('pcdl_ss.token', JSON.stringify(userToken.body.specialists_id))
    }
    localStorage.setItem('pcdl_ss.email', JSON.stringify(userToken.body.email))
    localStorage.setItem('pcdl_ss.user', JSON.stringify(userToken.body))
    setToken(userToken.body.token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
