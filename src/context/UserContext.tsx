"use client";

import React, { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
import { baseUrl, updateProfile } from "@/utils/constants";
import { auth } from "@/app/config";
import instance from "@/utils/axios";
import { customerDetails } from "@/utils/constants";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  alternatePhone: string;
  gender: string;
  dateOfBirth: string;
  profilePicture: File | null;
  customer: any;
}

type UserDetailsKeys = keyof UserDetails;

const initialState: UserState = {
  isLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true",
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOG_IN":
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
      }
      return { isLoggedIn: true };
    case "LOG_OUT":
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "false");
      }
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
  const router = useRouter();
  const cookieToken = Cookies.get("localtoken");

  const logIn = async () => {
    dispatch({ type: "LOG_IN" });
    await getUser();

    const redirectPath = localStorage.getItem("redirectPath") || "/";
    router.push(redirectPath);
    localStorage.removeItem("redirectPath");
  };

  // const logOut = () => {
  //   window.location.href = "/";
  //   dispatch({ type: "LOG_OUT" });
  // };

  const logOut = () => {
    // localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    window.location.href = "/";
    dispatch({ type: "LOG_OUT" });
  };

  const getUser = async () => {
    try {
      const response = await instance.get(`${baseUrl}${customerDetails}`, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });
      setUserDetails(response.data);
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
        }
      );
      await getUser();
      return response.data;
    } catch (error) {
      console.error("Error adding user details:", error);
      throw error;
    }
  };

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






// "use client";

// import React, {
//   createContext,
//   useContext,
//   useReducer,
//   useState,
//   useEffect,
// } from "react";
// import axios from "axios";
// import { baseUrl, updateProfile } from "@/utils/constants";
// import { auth } from "@/app/config";
// import instance from "@/utils/axios";
// import { customerDetails } from "@/utils/constants";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// interface UserState {
//   isLoggedIn: boolean;
// }

// type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

// interface UserContextProps {
//   userState: UserState;
//   isLoggedIn: boolean;
//   logIn: () => void;
//   logOut: () => void;
//   addUserDetails: (details: UserDetails) => Promise<void>;
//   userDetails: UserDetails | null;
//   getUser: () => Promise<void>;
// }

// interface UserDetails {
//   firstname: string;
//   lastname: string;
//   email: string;
//   phone: string;
//   alternatePhone: string;
//   gender: string;
//   dateOfBirth: string;
//   profilePicture: File | null;
//   customer: any;
// }

// type UserDetailsKeys = keyof UserDetails;

// const initialState: UserState = {
//   isLoggedIn:
//     typeof window !== "undefined" &&
//     localStorage.getItem("isLoggedIn") === "true",
// };

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// const userReducer = (state: UserState, action: UserAction): UserState => {
//   switch (action.type) {
//     case "LOG_IN":
//       if (typeof window !== "undefined") {
//         localStorage.setItem("isLoggedIn", "true");
//       }
//       return { isLoggedIn: true };
//     case "LOG_OUT":
//       if (typeof window !== "undefined") {
//         localStorage.setItem("isLoggedIn", "false");
//       }
//       return { isLoggedIn: false };
//     default:
//       return state;
//   }
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [userState, dispatch] = useReducer(userReducer, initialState);
//   const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
//   const router = useRouter();
//   const cookieToken = Cookies.get("localtoken");

//   const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // Auto logout after 30 minutes of inactivity

//   useEffect(() => {
//     const events = ["click", "mousemove", "keypress", "scroll"];
//     let timeout: NodeJS.Timeout;

//     const resetTimer = () => {
//       clearTimeout(timeout);
//       timeout = setTimeout(logOut, AUTO_LOGOUT_TIME);
//     };

//     const setEventListeners = () => {
//       events.forEach((event) => {
//         window.addEventListener(event, resetTimer);
//       });
//     };

//     const clearEventListeners = () => {
//       events.forEach((event) => {
//         window.removeEventListener(event, resetTimer);
//       });
//     };

//     if (userState.isLoggedIn) {
//       setEventListeners();
//       resetTimer();
//     }

//     return () => {
//       clearTimeout(timeout);
//       clearEventListeners();
//     };
//   }, [userState.isLoggedIn]);

//   const logIn = async () => {
//     dispatch({ type: "LOG_IN" });
//     await getUser();

//     const redirectPath = localStorage.getItem("redirectPath") || "/";
//     router.push(redirectPath);
//     localStorage.removeItem("redirectPath");
//   };

//   const logOut = () => {
//     localStorage.clear();
//     window.location.href = "/";
//     dispatch({ type: "LOG_OUT" });
//   };

//   const getUser = async () => {
//     try {
//       const response = await instance.get(`${baseUrl}${customerDetails}`, {
//         headers: {
//           Authorization: `Bearer ${cookieToken}`,
//         },
//       });
//       setUserDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const addUserDetails = async (details: UserDetails) => {
//     const formData = new FormData();

//     Object.keys(details).forEach((key) => {
//       const typedKey = key as UserDetailsKeys;
//       formData.append(typedKey, details[typedKey] as any);
//     });

//     try {
//       const response = await instance.post(
//         `${baseUrl}${updateProfile}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${cookieToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       await getUser();
//       return response.data;
//     } catch (error) {
//       console.error("Error adding user details:", error);
//       throw error;
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         userState,
//         isLoggedIn: userState.isLoggedIn,
//         logIn,
//         logOut,
//         addUserDetails,
//         userDetails,
//         getUser,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };
