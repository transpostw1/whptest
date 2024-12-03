"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Category {
  id: number;
  name: string;
  url: string;
  menuImg: string;
  parentImg: string;
  parent_id: number | null;
}

interface CategoryContextType {
  categories: Category[];
}

const MainMenuContext = createContext<any>(undefined);

const MainMenuProvider = ({ children }: { children: ReactNode }) => {
  const [allMenus, setAllMenus] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const GET_MAINMENU = gql`
        query GetAllMenus {
          getAllMenus {
            id
            name
            label
            url
            image
            parent_id
            subCategory {
              name
              label
              url
              parent_id
              image
              id
              subCategory {
                url
                parent_id
                name
                label
                image
                id
              }
            }
          }
        }
      `;
      const { data } = await client.query({
        query: GET_MAINMENU,
      });
      setAllMenus(data.getAllMenus);
    };
    fetchCategories();
  }, []);

  return (
    <MainMenuContext.Provider value={{ allMenus }}>
      {children}
    </MainMenuContext.Provider>
  );
};

const useMainMenuContext = () => {
  const context = useContext(MainMenuContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider",
    );
  }
  return context;
};

export { MainMenuProvider, useMainMenuContext };
