"use client"
import React from 'react'
import Offers from '@/components/Offers/Offers'

const page = () => {
  return (
    <>
        <head>
    <title>Offers @ WHP</title>
    <meta
          name="description"
          content={
           "Sign Up to WHP."
          }
        />
    </head>
    <Offers/>
    </>
  )
}

export default page