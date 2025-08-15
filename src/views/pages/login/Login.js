import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useDocumentTitle from '../../../components/useDocumentTitle'
import PropTypes from 'prop-types'

export default function Login({ setToken, redirect }) {
  useDocumentTitle('Sign In | PCDL Affiliate')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorM, setErrorM] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function loginUser(email, password) {
    return fetch(`${import.meta.env.VITE_APP_API_SPECIALIST}specialists/signin`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify({ email, password }),
    }).then((data) => data.json())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = await loginUser(email, password)

    if (token.status) {
      if (token.data.statusCode === 300) {
        setErrorM('Incorrect password, please try again')
        setError(true)
        setLoading(false)
      } else if (token.data.errorType === 'SSLError') {
        setErrorM('This Email does not exist')
        setError(true)
        setLoading(false)
      } else if (token.data.statusCode === 200) {
        setToken(token.data)
        setError(false)
        setLoading(false)
        if (token.data.body.specialist_id === undefined) {
          console.log('hello')
        }
        // if (location.pathname.includes('login')) {
        //   // navigate('/')
        //   window.location.replace('/dashboard')
        // } else {
        //   window.location.replace(location.pathname)
        // }
      }
    } else {
      setErrorM('An error has occurred')
      setError(true)
      setLoading(false)
    }
  }
  return (
    <div className="bg-body-tertiary min-h-[90vh] d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="px-6 mt-6 pb-4 text-sm font-bold text-red-600">
                      {error ? <span>{errorM}</span> : ''}
                    </div>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In with you PCDL account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
}
