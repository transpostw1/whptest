"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { graphqlbaseUrl, baseUrl, updateProfile } from "@/utils/constants";
import instance from "@/utils/axios";
import { useRouter } from "next/navigation";

interface UserState {
  isLoggedIn: boolean;
}

type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

interface UserContextProps {
  userState: UserState;
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  addUserDetails: (details: UserDetails) => Promise<void>;
  userDetails: UserDetails | null;
  getUser: () => Promise<void>;
}
interface UserDetails {
  customer_id: any;
  firstname: string;
  lastname: string;
  email: string;
  mobile_no: string;
  altPhone: string;
  gender: string;
  gstNum: string;
  panNum: string;
  dob: string;
  wallet_amount: any;
  profile_picture: File | null;
  customer: any;
  pan: any;
  gst_no: any;
}
type UserDetailsKeys = keyof UserDetails;

const initialState: UserState = {
  isLoggedIn: false,
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOG_IN":
      return { isLoggedIn: true };
    case "LOG_OUT":
      return { isLoggedIn: false };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  // const [cookieToken, setCookieToken] = useState<string | null>(null);
  const router = useRouter();
  const cookieToken =
    typeof window !== "undefined" ? localStorage.getItem("localtoken") : null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      // setCookieToken(token);
      dispatch({ type: isLoggedIn ? "LOG_IN" : "LOG_OUT" });
    }
  }, []);

  const logIn = async () => {
    dispatch({ type: "LOG_IN" });
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
    }
    await getUser();
    let redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath === "/login" || redirectPath === "/register") {
      redirectPath = "/";
    }
    router.push(redirectPath);
    localStorage.removeItem("redirectPath");
  };

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
    dispatch({ type: "LOG_OUT" });
  };

  const getUser = async () => {
    const getAuthHeaders = () => {
      if (!cookieToken) return undefined;
      return {
        authorization: `Bearer ${cookieToken}`,
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

    const GET_CUSTOMER_DETAILS = gql`
      query GetCustomerDetails($token: String!) {
        getCustomerDetails(token: $token) {
          customer_id
          fullname
          firstname
          lastname
          email
          mobile_no
          altPhone
          dob
          gender
          profile_picture
          wallet_amount
          status
          created_at
          pan
          gst_no
        }
      }
    `;
    const variables = { token: cookieToken };

    try {
      const { data } = await client.query({
        query: GET_CUSTOMER_DETAILS,
        variables,
      });
      setUserDetails(data.getCustomerDetails);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const addUserDetails = async (details: UserDetails) => {
    const formData = new FormData();
    Object.keys(details).forEach((key) => {
      const typedKey = key as UserDetailsKeys;
      formData.append(typedKey, details[typedKey] as any);
    });

    try {
      const response = await instance.post(
        `${baseUrl}${updateProfile}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      await getUser();
      return response.data;
    } catch (error) {
      console.error("Error adding user details:", error);
      throw error;
    }
  };
  useEffect(() => {
    console.log(userDetails,"Customer details");
  }, [userDetails]);

  return (
    <UserContext.Provider
      value={{
        userState,
        isLoggedIn: userState.isLoggedIn,
        logIn,
        logOut,
        addUserDetails,
        userDetails,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
