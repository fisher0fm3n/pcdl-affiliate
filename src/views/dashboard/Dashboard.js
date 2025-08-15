import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
  CForm,
  CFormInput,
} from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Loading from '../../components/Loading'

const findMostFrequentSubscription = (subscriptions) => {
  const subscriptionCounts = {}

  subscriptions.forEach(({ subscription }) => {
    subscriptionCounts[subscription] = (subscriptionCounts[subscription] || 0) + 1
  })

  let mostFrequentSubscription = ''
  let maxCount = 0

  Object.entries(subscriptionCounts).forEach(([subscription, count]) => {
    if (count > maxCount) {
      mostFrequentSubscription = subscription
      maxCount = count
    }
  })

  return mostFrequentSubscription
}

const Dashboard = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('')
  const [errorM, setErrorM] = useState('')
  const [error, setError] = useState(false)
  const [createMode, setCreateMode] = useState(false)
  const [affiliate, setAffiliate] = useState('')

  async function getAffiliate() {
    const res = await fetch(`${import.meta.env.VITE_APP_API_SPECIALIST}specialists/affiliate`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify({
        operation: 'get',
        email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
        specialists_id: JSON.parse(localStorage.getItem('pcdl_ss.token')),
      }),
    })

    const data = await res.json()

    if (data.data.length > 0) {
      setCreateMode(false)
      // console.log(findMostFrequentSubscription(data.data[0]))
      console.log(data.data[0])
      setAffiliate(data.data[0].SK)

      if (data.status) {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_SPECIALIST}specialists/subscription`,
          {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Request-Method': 'POST',
            },
            body: JSON.stringify({
              operation: 'total',
              affiliate: data.data[0].SK,
              specialists_id: JSON.parse(localStorage.getItem('pcdl_ss.token')),
            }),
          },
        )

        const data2 = await res.json()
        setTotal(data2.total)
        setData(data2.data)
        setLoading(false)
      }
    } else {
      setCreateMode(true)
      setLoading(false)
    }
  }

  async function createAffiliate(affiliate) {
    const res = await fetch(`${import.meta.env.VITE_APP_API_SPECIALIST}specialists/affiliate`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify({
        operation: 'create',
        email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
        specialists_id: JSON.parse(localStorage.getItem('pcdl_ss.token')),
        affiliate,
      }),
    })

    const data = await res.json()

    if (!data.status) {
      setErrorM('This affiliate code already exists, please try another')
      setError(true)
    } else {
      setError(false)
      window.location.reload()
    }

    if (data.data.length > 0) {
      setCreateMode(false)
      setData(data.data[0])
      // console.log(findMostFrequentSubscription(data.data[0]))
    }
  }

  useEffect(() => {
    setLoading(true)
    getAffiliate()
  }, [])

  return (
    <>
      {!loading ? (
        <>
          {createMode ? (
            <CForm>
              <div className="mb-3 mt-4">
                <CFormLabel htmlFor="exampleFormControlInput1">Create Affiliate Link</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Please enter your desired affiliate code"
                />
                <CButton
                  onClick={() => createAffiliate(code)}
                  color="primary"
                  href="#"
                  className="mt-2"
                >
                  Create
                </CButton>
                <div className="px-6 mt-6 pb-4 text-sm font-bold text-red-600">
                  {error ? <span>{errorM}</span> : ''}
                </div>
              </div>
            </CForm>
          ) : (
            <>
              <WidgetsDropdown
                transactions={data.length}
                earnings={total}
                // top_subscription={findMostFrequentSubscription(data)}
                className="mb-4"
              />
              <div className="flex flex-col gap-2 mb-4">
                <div>
                  <h1 className="text-sm">Affiliate Code</h1>
                  <p className="text-sm">{affiliate}</p>
                </div>
                <div>
                  <h1 className="text-sm">Refferal Link</h1>
                  <h1 className="text-sm">{`https://pcdl.co/ref/${affiliate}`}</h1>
                </div>
                <button
                  type="button"
                  className="block rounded-md w-20 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://pcdl.co/ref/${affiliate}`)
                  }}
                >
                  Copy
                  <span className="sr-only">Copy</span>
                </button>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Id</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">promo</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Subscription</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Continent</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Country</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">City</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Espees</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.PK}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.promo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.paymentRef}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.continent}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.country}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.city}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.amount}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{new Date(item.timestamp * 1000).toLocaleDateString('en-GB')}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </>
          )}
          {/* <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>Transactions</CCardHeader>
                <CCardBody>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                      <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary">Id</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Days</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                          Subscription
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Country</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Espees</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Date</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data.subscriptions.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell>
                            <div>{item.uID}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.days}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.subscription}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.country}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.amount}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{new Date(item.timestamp * 1000).toLocaleDateString('en-GB')}</div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow> */}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Dashboard
