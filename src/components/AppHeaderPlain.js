import React, { useLayoutEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

import logo from '../assets/brand/logo.png'
import useToken from './useToken'
import { includesAny } from '../assets/scripts/scripts'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { token, setToken } = useToken()
  const location = useLocation()

  useLayoutEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })

    console.log(location.pathname)
  }, [])

  return (
    <>
      {(['/login', '/register', '/404', '/500', '/terms', '/home', '/solutions-academy'].some(
        (el) => location.pathname.includes(el),
      ) ||
        !token) && (
        <CHeader position="sticky" className="p-0" ref={headerRef}>
          <CContainer className="justify-center items-center border-bottom px-4" fluid>
            <CNavLink href="/">
              <p className="m-0">PCDL Affiliate</p>
              {/* <img className="h-20 mx-2 py-2 sidebar-brand-full" src={logo} /> */}
            </CNavLink>
            {location.pathname != '/terms' && (
              <CHeaderNav className="items-center d-none d-md-flex">
                <CNavItem>
                  <CNavLink to="/" as={NavLink}>
                    Home
                  </CNavLink>
                </CNavItem>
                {/* <CNavItem>
                  <CNavLink to="/solutions-academy" as={NavLink}>
                    Solutions Academy
                  </CNavLink>
                </CNavItem> */}
                {token && (
                  <CNavItem>
                    <CNavLink to="/dashboard" as={NavLink}>
                      Solutions Specialists
                    </CNavLink>
                  </CNavItem>
                )}
                {/* <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li> */}
                <CDropdown variant="nav-item" placement="bottom-end">
                  <CDropdownToggle className="flex" caret={false}>
                    {colorMode === 'dark' ? (
                      <CIcon icon={cilMoon} size="lg" />
                    ) : colorMode === 'auto' ? (
                      <CIcon icon={cilContrast} size="lg" />
                    ) : (
                      <CIcon icon={cilSun} size="lg" />
                    )}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      active={colorMode === 'light'}
                      className="d-flex align-items-center"
                      as="button"
                      type="button"
                      onClick={() => setColorMode('light')}
                    >
                      <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                    </CDropdownItem>
                    <CDropdownItem
                      active={colorMode === 'dark'}
                      className="d-flex align-items-center"
                      as="button"
                      type="button"
                      onClick={() => setColorMode('dark')}
                    >
                      <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                    </CDropdownItem>
                    <CDropdownItem
                      active={colorMode === 'auto'}
                      className="d-flex align-items-center"
                      as="button"
                      type="button"
                      onClick={() => setColorMode('auto')}
                    >
                      <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                {/* <AppHeaderDropdown /> */}
                {!token ? (
                  <CNavItem className="pl-2">
                    <Link
                      to="/login"
                      className="no-underline rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    >
                      Login
                    </Link>
                  </CNavItem>
                ) : (
                  <AppHeaderDropdown />
                )}
              </CHeaderNav>
            )}
          </CContainer>
          {/* <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer> */}
        </CHeader>
      )}
    </>
  )
}

export default AppHeader
