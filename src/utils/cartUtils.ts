import { graphqlbaseUrl } from "./constants";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

interface CartItem {
  productDetails: {
    displayTitle: string;
    discountPrice: any;
    productPrice: any;
    imageDetails: any;
    url:any;
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
  variants?: { variantType: string; variantName: string }[];
}

export const fetchCartItemsFromServer = async (): Promise<CartItem[]> => {
  try {
    const userToken = typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;
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

    const GET_CUSTOMER_CART = gql`
      query GetCustomerCart($token: String!) {
        getCustomerCart(token: $token) {
          id
          userId
          productId
          quantity
          variants{
             variantType 
             variantName
          }
          productDetails {
            productId
            url
            displayTitle
            quantity
            makeToOrder
            productPrice
            discountPrice
            imageDetails {
              alt_text
              image_path
              order
            }
            videoDetails {
              alt_text
              order
              video_path
            }
          }
        }
      }
    `;

    const variables = { token: userToken };
    const { data } = await client.query({
      query: GET_CUSTOMER_CART,
      variables,
      context: {
        headers: getAuthHeaders(),
      },
    });

    const cartItemsData = data.getCustomerCart.map((item: any) => {
      const imagePath = item.productDetails[0].imageDetails[0].image_path;
      const discountPrice = parseInt(item.productDetails[0].discountPrice);
      const productPrice = parseInt(item.productDetails[0].productPrice);
      const quantityleft = item.productDetails[0].quantity;
      const url=item.productDetails[0].url;
      const price = isNaN(discountPrice) ? productPrice : discountPrice;

      return {
        productId: item.productId,
        url:url,
        quantity: item.quantity,
        name: item.productDetails[0].displayTitle,
        price: price,
        productPrice : productPrice,
        image: imagePath,
        variants:item.variants,
      };
    });

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