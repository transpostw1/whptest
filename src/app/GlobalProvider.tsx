import React from 'react'
import { ProductProvider } from '@/context/ProductContext'
import { CartProvider } from '@/context/CartContext'
import { UserProvider } from '@/context/UserContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { ModalCompareProvider } from '@/context/ModalCompareContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'
import { ModalQuickviewProvider } from '@/context/ModalQuickviewContext'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <ProductProvider>
        <UserProvider>
          <CartProvider>
            <ModalCartProvider>
              <WishlistProvider>
                <ModalWishlistProvider>
                  <CompareProvider>
                    <ModalCompareProvider>
                      <ModalSearchProvider>
                        <ModalQuickviewProvider>
                          {children}
                        </ModalQuickviewProvider>
                      </ModalSearchProvider>
                    </ModalCompareProvider>
                  </CompareProvider>
                </ModalWishlistProvider>
              </WishlistProvider>
            </ModalCartProvider>
          </CartProvider>
        </UserProvider>
      </ProductProvider>
    );
}

export default GlobalProvider