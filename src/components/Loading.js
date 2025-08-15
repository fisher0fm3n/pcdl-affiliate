import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

export default function Loading() {
  return (
    <div className="centered-axis-xy" role="status">
      <Player src="/PCDL_LoadingAni.json" className="player h-12" loop autoplay />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
