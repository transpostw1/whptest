import axios from "axios";
import { baseUrl, getCartItems, graphqlbaseUrl } from "./constants";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";


// interface CartItem {
//   productId: number;
//   quantity: number;
//   name: string;
//   price: number;
//   image: string;
// }

interface CartItem {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    imageDetails: any;
  };
  gst?: any;
  displayTitle?: string;
  discountPrice?: any;
  imageDetails?: any;
  productId: number;
  quantity?: number;
  name?: string;
  price?: number;
  image?: string;
}

export const fetchCartItemsFromServer = async (): Promise<CartItem[]> => {
  try {
    const userToken = Cookies.get("localtoken");
    if (!userToken) {
      return [];
    }

    const getAuthHeaders = () => {
      if (!userToken) return null;
      return {
        authorization: `Bearer ${userToken}`,
      };
    };

    const link = new HttpLink({
      uri: graphqlbaseUrl,
      headers: getAuthHeaders(),
    });

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });

    const GET_CART = gql `query Query($token: String!) {
      getCustomerCart(token: $token) {
        id
        quantity
        productDetails {
          productId
          productAmount
          quantity
          url
          SKU
          variantId
          productTotal
          metalType
          metalWeight
          discountAmount
          discountValue
          typeOfDiscount
          discountedTotal
          displayTitle
          productPrice
          discountPrice
          mediaId
          imageDetails {
            image_path
            order
            alt_text
          }
          videoDetails {
            video_path
            order
            alt_text
          }
          rating
        }
      }
    }`;

    const variables = { token: userToken };
        const { data } = await client.query({
          query: GET_CART,
          variables,
        });

    const cartItemsData = data.map((item: any) => {
      const imageDetails = JSON.parse(item.productDetails[0].imageDetails);
      imageDetails.sort((a: any, b: any) => a.order - b.order);
      const imagePath = imageDetails[0] ? imageDetails[0].image_path : "";
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: item.productDetails[0].displayTitle,
        price: parseInt(item.productDetails[0].discountPrice),
        image: imagePath,
      };
    });

    // localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
    {
      typeof window !== "undefined" &&
        localStorage.setItem("cartItems", JSON.stringify(cartItemsData));
    }
    return cartItemsData;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};
