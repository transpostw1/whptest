import React from 'react'
import Image from 'next/image'

const WhatWeOffer = () => {
    return (
        <>
            <div className='bg-[#F9F5F5] text-[#39161C]'>
                <div className='flex flex-wrap'>
                    <div className='w-full sm:w-[50%]'>
                        <Image src={'/images/other/whatweoffer.png'} className="w-full h-auto" alt='What We Offer' width={500} height={500} />
                    </div>
                    <div className='w-full flex flex-col sm:w-[50%] p-4 sm:p-[4rem]'>
                        <div>
                            <p className='lg:text-[3rem] text-[2rem] font-semibold pb-5'>What we Offer</p>
                            <p className='text-sm md:text-base w-[30rem]'>Discover our offerings. Our commitment to quality, elegance, and personalised service ensures an exceptional experience.</p>
                        </div>
                        <div className='mt-auto flex-end'>
                            <div className='flex justify-between'>
                                <div>
                                    <Image src={'/images/icons/star.svg'} alt='Star' width={40} height={40} />
                                    <p className='font-semibold text-lg md:text-xl py-3'>12000 + UNIQUE DESIGNS</p>
                                    <p className='text-sm md:text-base w-[30rem]'>Elevate your style with our distinctive jewellery designs, where creativity and craftsmanship unite.</p>
                                    <a className='pt-3 inline-flex items-center'><span className='me-2 text-[#E26178] underline cursor-pointer text-sm'>Next</span><span><Image src={'/images/icons/rightarrow.svg'} alt='Right Arrow' width={20} height={20} /></span></a>
                                </div>
                                <div className="hidden sm:block">
                                    <p className='font-semibold text-lg tracking-[0.49rem]'  style={{ textOrientation: 'mixed', writingMode: "vertical-lr", transform: "rotate(180deg)" }}>OFFERINGS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatWeOffer