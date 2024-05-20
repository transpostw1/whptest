import React from "react";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import { CouponCodeProvider } from "@/context/CouponContext";
import { CategoryProvider } from "@/context/CategoryContex";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProductProvider>
      <UserProvider>
        <CategoryProvider>
          <CouponCodeProvider>
            <CartProvider>
              <ModalCartProvider>
                <WishlistProvider>
                  {/* <ModalWishlistProvider> */}
                    <CompareProvider>
                      <ModalSearchProvider>
                        <ModalQuickviewProvider>
                          {children}
                        </ModalQuickviewProvider>
                      </ModalSearchProvider>
                    </CompareProvider>
                  {/* </ModalWishlistProvider> */}
                </WishlistProvider>
              </ModalCartProvider>
            </CartProvider>
          </CouponCodeProvider>
        </CategoryProvider>
      </UserProvider>
    </ProductProvider>
  );
};

export default GlobalProvider;
