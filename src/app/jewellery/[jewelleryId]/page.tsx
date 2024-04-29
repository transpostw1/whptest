import React from 'react'

interface PageProps{
    params:{
        jewelleryId:number;
    }
}
const page:React.FC<PageProps>= ({params}) => {
  return (
    <div>page by id {params.jewelleryId}</div>
  )
}

export default page