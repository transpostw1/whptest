'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Default from '@/components/Product/Detail/Default';


const ProductDefault = () => {
    const searchParams = useSearchParams()
    let productId = searchParams.get('id')

    if (productId === null) {
        productId = '1'
    }

    return (
        <>
            <Default productId={productId} />
        </>
    )
}

export default ProductDefault