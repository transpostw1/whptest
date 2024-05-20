import axios from "axios";
import { baseUrl, getCartItems } from "./constants";
import Cookies from "js-cookie";

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export const fetchCartItemsFromServer = async (): Promise<CartItem[]> => {
    try {
      const userToken = Cookies.get("localtoken");
      if (!userToken) {
        return [];
      }
  
      const response = await axios.get(`${baseUrl}${getCartItems}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      const cartItemsData = response.data.cart_items.map((item: any) => {
        const imageDetails = JSON.parse(item.product_details[0].imageDetails);
        imageDetails.sort((a: any, b: any) => a.order - b.order);
        const imagePath = imageDetails[0] ? imageDetails[0].image_path : "";
        return {
          productId: item.productId,
          quantity: item.quantity,
          name: item.product_details[0].displayTitle,
          price: parseInt(item.product_details[0].discountPrice),
          image: imagePath,
        };
      });
  
      localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
      return cartItemsData;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
  };