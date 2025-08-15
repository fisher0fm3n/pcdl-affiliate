/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */

const SignOut = () => {
  setTimeout(() => {
    window.location.reload()
  }, 1000)
  localStorage.removeItem('pcdl_ss.token')
  localStorage.removeItem('pcdl_ss.user')
  localStorage.removeItem('pcdl_ss.email')
  localStorage.removeItem('pcdl_ss.refer')
  localStorage.removeItem('pcdl_ss.subscription_name')
}

// Scroll To Top

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getIndex = (val, arr) => {
  const locate = (element) => element.name === val
  return arr.findIndex(locate)
}

const handleCheckboxChange = (e, arr, func) => {
  let newArray = [...arr, e.target.id]
  if (arr.includes(e.target.id)) {
    // eslint-disable-next-line no-unused-vars
    newArray = newArray.filter((item) => item !== e.target.id)
  }
  func(newArray)
}

const isPresent = (obj, array) => {
  if (array) {
    const locate = (element) => element === obj
    return array.some(locate)
  }
  return false
}

const setTypeFunc = (e, func1, func2) => {
  func1(e.name)
  func2(e)
}

const showNotification = (setFunc) => {
  setFunc(true)
  setTimeout(() => {
    setFunc(false)
  }, 4000)
}

const deleteSeries = async (e, id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'DELETE',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  }
  e.preventDefault()

  const response = await fetch(
    `${process.env.REACT_APP_API_PCDLSUB_A}3?SeriesId=${id}`,
    requestOptions,
  )
  const json = await response.json()

  if (!response.ok) {
    console.log(json.error)
  } else if (response.ok) {
    scrollToTop()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

const deleteSeason = async (e, SeriesId, SeasonId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'DELETE',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SeriesId,
      SeasonId,
    }),
  }

  e.preventDefault()

  const response = await fetch(`${process.env.REACT_APP_API_PCDLSUB_A}5`, requestOptions)
  const json = await response.json()

  if (!response.ok) {
    console.log(json.error)
  } else if (response.ok) {
    scrollToTop()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

const deleteMessage = async (e, SeriesId, SeasonId, MessagesId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'DELETE',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      SeriesId,
      SeasonId,
      MessagesId,
    }),
  }

  e.preventDefault()

  const response = await fetch(`${process.env.REACT_APP_API_PCDLSUB_A}7`, requestOptions)
  const json = await response.json()

  if (!response.ok) {
    console.log(json.error)
  } else if (response.ok) {
    scrollToTop()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

function refreshPage() {
  window.location.reload()
}

const refreshUserData = () => {
  const fetchData = async () => {
    const email = JSON.parse(localStorage.getItem('pcdl_ss.email'))
    const token = JSON.parse(localStorage.getItem('pcdl_ss.token'))

    const res = await fetch(`${process.env.REACT_APP_API_PCDLSUB_C}/checksubscriptionstatus`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    })

    const data = await res.json()

    const update = JSON.parse(localStorage.getItem('pcdl_ss.user'))

    if (
      update.subscription_name !== data.body.subscription_name ||
      update.wallet_balance !== data.body.wallet_balance
    ) {
      update.subscription_name = data.body.subscription_name
      update.wallet_balance = data.body.wallet_balance
      localStorage.setItem('pcdl_ss.user', JSON.stringify(update))
    }
  }
  fetchData().catch(console.error)
}

const extendSubscription = async (type, paymentId, amount, days) => {
  const response = await fetch(`${process.env.REACT_APP_API_1BS}payment`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'POST',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      amount,
      type,
    }),
  })

  const json = await response.json()

  // console.log(json);
}

const affiliateSignUp = async (email, first_name, ref) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'POST',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'API-TOKEN': process.env.REACT_APP_API_SUB_TOKEN,
    },
    body: JSON.stringify({
      email,
      name: first_name,
      ref,
      product: 1,
    }),
  }

  const response = await fetch(
    'https://pcdlsub.loveworldapis.com/api/affiliate/add',
    requestOptions,
  )

  const json = await response.json()
}

const affiliatePurchase = async (email, first_name, payload, ref) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'POST',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'API-TOKEN': process.env.REACT_APP_API_SUB_TOKEN,
    },
    body: JSON.stringify({
      email,
      name: first_name,
      ref,
      payload,
      product: 2,
    }),
  }

  const response = await fetch(
    'https://pcdlsub.loveworldapis.com/api/affiliate/add',
    requestOptions,
  )

  const json = await response.json()
}

const purchaseAlbum = async (albumID, albumPrice) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': 'POST',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      token: JSON.parse(localStorage.getItem('pcdl_ss.user')).token,
      albumID,
      ProductPrice: albumPrice,
      api_key: process.env.REACT_APP_API,
    }),
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_PCDLSUB_C}/external/userbuyproduct`,
    requestOptions,
  )

  const json = await response.json()

  // Add album to users library temp
  const x = JSON.parse(localStorage.getItem('pcdl_ss.user')).library

  const newLibrary = [...x, json.new_purchase]

  const updatedUser = JSON.parse(localStorage.getItem('pcdl_ss.user'))

  updatedUser.library = newLibrary

  localStorage.setItem('pcdl_ss.user', JSON.stringify(updatedUser))
}

const espeesSubscription = async (e, amount, days, tier, setError, setShow) => {
  e.preventDefault()

  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)

  const user = JSON.parse(localStorage.getItem('pcdl_ss.user'))

  let affiliate = ''
  try {
    affiliate = JSON.parse(localStorage.getItem('pcdl_ss.user')).affiliate
  } catch {
    affiliate = ''
  }

  if (affiliate) {
    affiliatePurchase(
      JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      JSON.parse(localStorage.getItem('pcdl_ss.user')).first_name,
      tier,
      affiliate,
    )
  }

  async function storeTransaction() {
    return fetch(`${process.env.REACT_APP_API_PCDLSUB_A}16`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'x-requested-with': '',
        'x-requested-by': '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TransactionId: array[0].toString(36),
        Type: 'Espees',
        Frequency: 'One Time',
        UserId: JSON.parse(localStorage.getItem('pcdl_ss.user')).token,
        UserEmail: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
        CreationDate: Date.now(),
        amount,
        days,
        plan: tier,
        affiliate,
      }),
    }).then((data) => data.json())
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_PCDLSUB_C}/external/userbuysubscription`,
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${user.email}`,
        token: `${user.token}`,
        days,
        amount,
        subscription_type: tier,
        api_key: `${process.env.REACT_APP_API}`,
      }),
    },
  )

  const data = await response.json()

  if (data.statusCode === 413) {
    setError('inbalance')
  } else if (data.statusCode === 200) {
    setError('complete')
    storeTransaction()
    setTimeout(() => {
      window.location.replace('/')
      setShow(false)
      setError('')
    }, 2000)
  }
}
const includesAny = (arr, values) => values.some((v) => arr.includes(v))

const espeesSubscriptionPromo = async (
  e,
  amount,
  days,
  tier,
  setError,
  setShow,
  promo,
  code,
  setLoading,
) => {
  e.preventDefault()
  setLoading(true)

  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)

  const user = JSON.parse(localStorage.getItem('pcdl_ss.user'))

  let affiliate = ''
  try {
    affiliate = JSON.parse(localStorage.getItem('pcdl_ss.user')).affiliate
  } catch {
    affiliate = ''
  }

  if (affiliate) {
    affiliatePurchase(
      JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      JSON.parse(localStorage.getItem('pcdl_ss.user')).first_name,
      tier,
      affiliate,
    )
  }

  async function storeTransaction() {
    return fetch(`${process.env.REACT_APP_API_PCDLSUB_A}16`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'x-requested-with': '',
        'x-requested-by': '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TransactionId: array[0].toString(36),
        Type: 'Espees',
        Frequency: 'One Time',
        UserId: JSON.parse(localStorage.getItem('pcdl_ss.user')).token,
        UserEmail: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
        CreationDate: Date.now(),
        amount,
        days,
        plan: tier,
        affiliate,
        promo,
        code,
      }),
    }).then((data) => data.json())
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_PCDLSUB_C}/external/userbuysubscription`,
    {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${user.email}`,
        token: `${user.token}`,
        days,
        amount,
        subscription_type: tier,
        api_key: `${process.env.REACT_APP_API}`,
      }),
    },
  )

  const data = await response.json()

  // console.log({
  //   email: `${user.email}`,
  //   token: `${user.token}`,
  //   days,
  //   amount,
  //   subscription_type: tier,
  //   api_key: `${process.env.REACT_APP_API}`,
  // });

  if (data.statusCode === 413) {
    setError('inbalance')
  } else if (data.statusCode === 200) {
    setError('complete')
    storeTransaction()
    setTimeout(() => {
      window.location.replace('/')
      setShow(false)
      setError('')
    }, 2000)
  }

  setLoading(false)
}

function capitalize(str) {
  const arr = str.split(' ')
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  const str2 = arr.join(' ')
  return str2
}

export {
  scrollToTop,
  getIndex,
  handleCheckboxChange,
  isPresent,
  setTypeFunc,
  showNotification,
  deleteMessage,
  deleteSeries,
  deleteSeason,
  refreshPage,
  refreshUserData,
  extendSubscription,
  capitalize,
  purchaseAlbum,
  espeesSubscription,
  espeesSubscriptionPromo,
  affiliateSignUp,
  affiliatePurchase,
  SignOut,
  includesAny,
}
