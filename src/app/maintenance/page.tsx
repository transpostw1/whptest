"use client"
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Maintanance = () => {
    
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' &&
      pathname !== '/maintenance'
    ) {
      router.push('/maintenance');
    }
  }, [pathname,router]);

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' && pathname !== '/maintenance') {
    return null;
  }
  return (

    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>We'll be back soon!</h1>
      <p>Our website is currently undergoing scheduled maintenance.</p>
    </div>
  )
}

export default Maintanance
