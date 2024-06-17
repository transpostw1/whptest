import axios from "axios";
import { baseUrl, getCartItems } from "./constants";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

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

  const link = new HttpLink({
    uri: graphqlbaseUrl,
    headers: getAuthHeaders(),
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

    const GET_CART_ITEMS = gql`
      query ExampleQuery($token: String!) {
        getCustomerCart(token: $token) {
          id
          customerID
          productId
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
          quantity
        }
      }
    `;

    // const response = await axios.get(`${baseUrl}${getCartItems}`, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    // });

     const variables = { token:userToken };
     const { data } = await client.query({
       query: GET_CART_ITEMS,
       variables,
     });

    const cartItemsData = data.getCustomerCart.map((item: any) => {
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
