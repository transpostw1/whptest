import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { graphqlProductUrl } from '@/utils/constants';
import { ProductType } from '@/type/ProductType';

export const useProductFetching = (combinedOptions: any, productsPerPage: number, offset: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [filters, setFilters] = useState<any>([]);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);

  const fetchData = async () => {
    if (
      combinedOptions.category.length > 0 ||
      combinedOptions.search.length > 0 ||
      combinedOptions.priceFilter.length > 0 ||
      combinedOptions.shop_for.length > 0 ||
      combinedOptions.karat.length > 0 ||
      combinedOptions.metal.length > 0 ||
      combinedOptions.occasion.length > 0 ||
      combinedOptions.productCategory.length > 0
    ) {
      try {
        setIsLoading(true);
        const client = new ApolloClient({
          uri: graphqlProductUrl,
          cache: new InMemoryCache(),
        });

        const MUTATION_PRODUCTS = gql`
          mutation Mutation($inputProducts: InputProducts) {
            products(inputProducts: $inputProducts) {
              productId
              SKU
              variantId
              title
              displayTitle
              url
              addDate
              isActive
              discountCategory
              discountActive
              typeOfDiscount
              discountValue
              discountAmount
              discountPrice
              productPrice
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
              review
              variants
              similarProductIds
              productCategories
              breadcrumbs {
                id
                title
                category_url
              }
            }
          }
        `;

        let inputVariables = {};
        if (combinedOptions.category[0] === "new_Arrival") {
          inputVariables = {
            category: [{ value: "" }],
            search: [{ value: "" }],
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.shop_for.map((shop_for: string) => ({
              value: shop_for,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            occasion: combinedOptions.occasion.map((occasion: string) => ({
              value: occasion,
            })),
            sortBy: "priority",
            sortOrder: "ASC",
            productCategory: combinedOptions.productCategory[0],
            limit: productsPerPage,
            offset: offset,
          };
        } else {
          inputVariables = {
            category: combinedOptions.category.map((category: string) => ({
              value: category,
            })),
            search: combinedOptions.search.map((search: string) => ({
              value: search,
            })),
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.shop_for.map((shop_for: string) => ({
              value: shop_for,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            occasion: combinedOptions.occasion.map((occasion: string) => ({
              value: occasion,
            })),
            sortBy: "priority",
            sortOrder: "ASC",
            productCategory: combinedOptions.productCategory[0],
            limit: productsPerPage,
            offset: offset,
          };
        }

        const variables = {
          inputProducts: inputVariables,
        };
        const { data } = await client.mutate({
          mutation: MUTATION_PRODUCTS,
          variables,
        });

        if (data && data.products) {
          setFilteredProducts((prevProducts) => {
            if (isLoadMore) {
              const newProducts = [...prevProducts, ...data.products];
              const uniqueProducts = Array.from(
                new Map(
                  newProducts.map((product) => [product.productId, product]),
                ).values(),
              );
              return uniqueProducts;
            } else {
              return data.products;
            }
          });
          setIsLoading(false);
          setIsLoadMore(false);
        }
      } catch (error) {
        setIsLoading(true);
        console.error("Error Occurred from ShopBreadCrumb1 GraphQL Mutation", error);
      }
    }
  };

  const fetchFilter = async () => {
    if (
      combinedOptions.category.length > 0 ||
      combinedOptions.search.length > 0 ||
      combinedOptions.priceFilter.length > 0 ||
      combinedOptions.shop_for.length > 0 ||
      combinedOptions.karat.length > 0 ||
      combinedOptions.metal.length > 0 ||
      combinedOptions.occasion.length > 0 ||
      combinedOptions.productCategory.length > 0
    ) {
      try {
        const client = new ApolloClient({
          uri: graphqlProductUrl,
          cache: new InMemoryCache(),
        });
        const MUTATION_FILTER_PRODUCTS = gql`
          mutation FilterProducts($inputFilterProducts: InputFilterProducts) {
            filterProducts(inputFilterProducts: $inputFilterProducts) {
              title
              options
              labels
            }
          }
        `;
        const variables = {
          inputFilterProducts: {
            search: combinedOptions.search.map((search: string) => ({
              value: search,
            })),
            category: combinedOptions.category.map((category: string) => ({
              value: category,
            })),
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.shop_for.map((shop_for: string) => ({
              value: shop_for,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            occasion: combinedOptions.occasion.map((occasion: string) => ({
              value: occasion,
            })),
            sortBy: "addDate",
            sortOrder: "DESC",
            productCategory: combinedOptions.productCategory[0],
          },
        };

        const { data } = await client.mutate({
          mutation: MUTATION_FILTER_PRODUCTS,
          variables,
        });

        if (data) {
          if (data.filterProducts) {
            setFilters(data.filterProducts);
          }
          if (data.products) {
            setFilteredProducts(data.products);
          }
          setIsLoadMore(false);
        }
      } catch (error) {
        console.error("Error Occurred from ShopBreadCrumb1 GraphQL Mutation", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchFilter();
  }, [combinedOptions, offset]);

  return {
    isLoading,
    filteredProducts,
    filters,
    isLoadMore,
    setIsLoadMore
  };
}; 