import Link from "next/link";
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";

interface Props {
  product: ProductType;
}
const Buttons: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, updateCart } = useCart();

  const handleAddToCart = (productItem: ProductType) => {
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productId
    );
    const currentquantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentquantity + 1;
    productAlreadyExists
      ? updateCart(productItem?.productId, updatedQuantity)
      : addToCart({ ...productItem });
  };
  return (
    <div className="flex sm:justify-around mt-[25px] ">
      <div className=" cursor-pointer bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white sm:w-[35%] h-[58px] mr-[10px] py-[18px] px-[32px] text-center">
        <Link
          href={{
            pathname: "/checkout",
          }}
        >
          Buy Now
        </Link>
      </div>

      <div
        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-[#e26178] w-[35%] h-[58px]  text-center mr-[10px] cursor-pointer"
        onClick={() => handleAddToCart(product)}
      >
        <div className=" m-[2px] mb-[2px] bg-white">
          <span className="flex justify-center py-[14px]">
            <span>Add to Cart</span>
            <span className="mt-1">
              <Icon.ShoppingCart />
            </span>
          </span>
        </div>
      </div>
      <div className="flex justify-center text-[#e26178] outline outline-[#e26178] outline-1 w-[56px] h-[58px] items-center cursor-pointer">
        {" "}
        <Icon.Heart size={27} weight="thin" />
      </div>
    </div>
  );
};
export default Buttons;
