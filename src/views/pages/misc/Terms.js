/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import useDocumentTitle from '../../../components/useDocumentTitle'
import { Link } from 'react-router-dom'

export default function Terms() {
  useDocumentTitle('Terms & Conditions | Pastor Chris Digital Library')
  const [checked, setChecked] = useState(false)
  const [verified, setVerified] = useState(false)

  const updateCheck = () => {
    setChecked(!checked)
  }

  async function checkUser() {
    const res = await fetch(`${import.meta.env.VITE_APP_API_SPECIALIST}specialists/consent`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify({
        operation: 'check',
        email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      }),
    })

    const data = await res.json()

    if (data.status) {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }

  async function insertUser() {
    const res = await fetch(`${import.meta.env.VITE_APP_API_SPECIALIST}specialists/consent`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method': 'POST',
      },
      body: JSON.stringify({
        operation: 'insert',
        email: JSON.parse(localStorage.getItem('pcdl_ss.user')).email,
      }),
    })

    const data = await res.json()

    if (data.status) {
      localStorage.setItem('pcdl_ss.token', JSON.stringify(data.specialist_id))
      window.location.replace('/dashboard')
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="max-w-4xl mx-auto text-left text-white space-y-4 px-6 mt-24 mb-8">
      <h1 className="text-xl font-bold">Terms and Conditions Solutions Specialists</h1>
      <ol className="list-decimal flex flex-col space-y-4 mx-4 ">
        <li>
          The Soulwinners Congress with Pastor Chris Bumper Offer, hereinafter referred to as the{' '}
          <span className="font-bold text-red-400 ">
            SWC Bumper Offer is Valid with ONLY Fresh Espees bought during the period of the offer.
          </span>
        </li>
        <li>
          The SWC Bumper Offer is available for Gold Star and Gold Classic Subscription ONLY and not
          for Espees to be accumulated and stored over time.
        </li>
        <li>
          The SWC Bumper Offer is valid from Thursday April 25th till Midnight Sunday, April 28th
          2024.
        </li>
        <li>
          Payment will be made through the Website www.pcdl.co/swc (please note that the Offer is
          NOT available through Google Play Store or Apple Store).
        </li>
        <li>
          To enjoy the Special Features of the Gold Star and Gold Classic Subscription, please
          download/upgrade to Pastor Chris Digital Library Version 6
        </li>
        <li>
          All Personal Subscriptions, Gift of Subscriptions and Sponsorship of Translations adds up
          to the individual, group and zonal partnership records and is recognized at IPPC.
        </li>
        <li>
          Existing Subscribers on a previous subscription package cannot upgrade for this SWC Bumper
          Offer. To enjoy the SWC Bumper Offer for any of the membership packages, fresh
          subscription, using fresh espees bought during the period of the SWC Bumper Offer is
          required. Every Subscription counts as Partnership.
        </li>
        <li>
          Those purchasing the subscription under the SWC Bumper Offer should carefully decide the
          subscription package required before payment. Once payment is made, it is not refundable
          and cannot be upgraded. Every subscription counts as Partnership.
        </li>
        <li>
          We reserve the right, at our sole discretion to determine who is eligible for the special
          offer.
        </li>
        <li>
          We reserve the right, at our sole discretion, to discontinue this SWC Bumper Offer or to
          extend if we deem necessary.
        </li>
      </ol>

      {!verified && (
        <>
          <label className="text-sm text-left">
            <input
              checked={checked}
              onChange={updateCheck}
              type="checkbox"
              className="accent-pink-500 text-left mr-3"
            />
            I accept the Terms and Conditions
          </label>

          <button
            type="submit"
            onClick={() => insertUser()}
            className={`${!checked && 'pointer-events-none'} flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Proceed
          </button>
        </>
      )}
    </div>
  )
}
