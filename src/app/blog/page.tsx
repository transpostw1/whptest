import React from 'react'
import Latest from '@/components/Blogcomp/Latest'
import Trending from '@/components/Blogcomp/Trending'
import Card from '@/components/Blogcomp/Card'
import instance from '@/utils/axios'

const page = () => {
  return (
    <div>
      <Latest/>
      <Trending/>
      <Card/>
    </div>
  )
}

export default page
