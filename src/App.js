import React, { Suspense, useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useToken from './components/useToken.jsx'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './App.css'
import AppHeader from './components/AppHeaderPlain.js'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Landing = React.lazy(() => import('./views/pages/landing/Landing'))
const SolutionsAcademy = React.lazy(() => import('./views/pages/solutionsAcademy/SolutionsAcademy'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Terms = React.lazy(() => import('./views/pages/misc/Terms.js'))
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const { token, setToken } = useToken()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <AppHeader />
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={token ? <Navigate to="/home" replace /> : <Login setToken={setToken} />}
          />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/terms" name="Terms & Conditions" element={<Terms />} />
          <Route
            exact
            path="/solutions-academy"
            name="Solutions Academy"
            element={<SolutionsAcademy />}
          />
          <Route path="/home" name="Home" element={<Landing />} />
          <Route path="/" name="Home" element={<Navigate to="/home" replace />} />
          <Route
            path="*"
            name="Home"
            element={!token ? <Login setToken={setToken} /> : <DefaultLayout />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
