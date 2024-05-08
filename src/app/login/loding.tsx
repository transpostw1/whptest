"use client"
import React from 'react'

const loading = () => {
  return (
    <div className='fixed inset-0 z-50 flex bg-black bg-opacity- h-full text-white'><video src='loader.gif'/></div>
  )
}

export default loading