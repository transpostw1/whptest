import { useState, useEffect } from 'react';

const useMenuMobile = () => {
    const [openMenuMobile, setOpenMenuMobile] = useState(false)

    const handleMenuMobile = () => {
        console.log(" yesssssssssssssssssssssssssssssssssssss i'm calllllllllllllllllleeeeeeeddddddddddddddddddddddd")
        setOpenMenuMobile((toggleOpen) => !toggleOpen)
    }
    const handleClickOutsideMenuMobile: EventListener = (event) => {
        const targetElement = event.target as Element;

        if (openMenuMobile && !targetElement.closest('#menu-mobile')) {
            setOpenMenuMobile(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenuMobile);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenuMobile);
        };
    }, [openMenuMobile])
    
    return {
        openMenuMobile,
        handleMenuMobile,
    }
}

export default useMenuMobile