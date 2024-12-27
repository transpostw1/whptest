"use client";
import { useState, useEffect } from "react";
import { ProductType, ProductData } from "@/type/ProductType";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

const useRecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Query to fetch recently viewed products
  const RECENTLY_VIEWED_PRODUCTS = gql`
    query GetRecentProducts {
      getRecentProducts {
        productId
        url
        SKU
        title
        productPrice
        discountPrice
        typeOfDiscount
        discountValue
        rating
        imageDetails {
          image_path
        }
        videoDetails {
          video_path
        }
      }
    }
  `;

  // Query to save recently viewed product
  const SAVE_RECENTLY_VIEWED = gql`
    mutation SaveRecentlyViewed($productId: ID!) {
      saveRecentlyViewed(productId: $productId) {
        success
        message
      }
    }
  `;

  // Query to remove recently viewed product
  const REMOVE_RECENTLY_VIEWED = gql`
    mutation RemoveRecentlyViewed($productId: ID!) {
      removeRecentlyViewed(productId: $productId) {
        success
        message
      }
    }
  `;

  // Initialize Apollo Client
  const getApolloClient = () => {
    const cookieToken = typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;
    
    const getAuthHeaders = () => {
      if (!cookieToken) return {};
      return {
        authorization: `Bearer ${cookieToken}`,
      };
    };

    const link = new HttpLink({
      uri: graphqlbaseUrl,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        setLoading(true);
        const client = getApolloClient();
        const { data } = await client.query({
          query: RECENTLY_VIEWED_PRODUCTS,
        });
        setRecentlyViewedProducts(data.getRecentProducts);
      } catch (error) {
        console.error("Error fetching recently viewed products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  const saveToRecentlyViewed = async (product: ProductData | null) => {
    if (!product?.productDetails?.productId) return;

    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: SAVE_RECENTLY_VIEWED,
        variables: {
          productId: product.productDetails.productId,
        },
      });

     
      const { data } = await client.query({
        query: RECENTLY_VIEWED_PRODUCTS,
        fetchPolicy: 'network-only', 
      });
      
      setRecentlyViewedProducts(data.getRecentProducts);
    } catch (error) {
      console.error("Error saving recently viewed product:", error);
    }
  };
  const removeFromRecentlyViewed = async (productId: string | number) => {
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: REMOVE_RECENTLY_VIEWED,
        variables: {
          productId,
        },
      });

      setRecentlyViewedProducts(prev => 
        prev.filter(product => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing recently viewed product:", error);
    }
  };

  return {
    recentlyViewedProducts,
    saveToRecentlyViewed,
    removeFromRecentlyViewed,
    loading,
  };
};

export default useRecentlyViewedProducts;