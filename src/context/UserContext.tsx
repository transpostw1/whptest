// "use client";

// import React, { createContext, useContext, useEffect, useReducer } from "react";
// import { auth } from "@/app/config";
// import { WindowsLogo } from "@phosphor-icons/react";

// interface UserState {
//   isLoggedIn: boolean;
// }

// type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

// interface UserContextProps {
//   userState: UserState;
//   isLoggedIn: boolean;
//   logIn: () => void;
//   logOut: () => void;
// }

// const initialState: UserState = {
//   isLoggedIn: typeof window !== 'undefined' && localStorage.getItem("isLoggedIn") === "true",
// };

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// const userReducer = (state: UserState, action: UserAction): UserState => {
//   const userDetails = auth.currentUser;
//   const user = userDetails?.uid;

//   switch (action.type) {
//     case "LOG_IN":
//       if (typeof window !== 'undefined') {
//         localStorage.setItem("isLoggedIn", "true");
//       }
//       return {
//         isLoggedIn: true,
//       };
//     case "LOG_OUT":
//       if (typeof window !== 'undefined') {
//         localStorage.setItem("isLoggedIn", "false");
//       }
//       return {
//         isLoggedIn: false,
//       };
//     default:
//       return state;
//   }
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [userState, dispatch] = useReducer(userReducer, initialState);

//   const logIn = () => {
//     dispatch({ type: "LOG_IN" });
//   };

//   const logOut = () => {
//     dispatch({ type: "LOG_OUT" });
//   };

//   return (
//     <UserContext.Provider value={{ userState,isLoggedIn: userState.isLoggedIn, logIn, logOut}}>
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



"use client";

import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { baseUrl, updateProfile } from "@/utils/constants";
import { auth } from "@/app/config";
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
}

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  alternatePhone: string;
  gender: string;
  dateOfBirth: string;
  profilePicture: File;
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
   const router = useRouter();

  const logIn = () => {
    dispatch({ type: "LOG_IN" });
  };

  const logOut = () => {
    router.push("/");
    dispatch({ type: "LOG_OUT" });
  };
const addUserDetails = async (details: UserDetails) => {
  const formData = new FormData();

  Object.keys(details).forEach((key) => {
    const typedKey = key as UserDetailsKeys; 
    formData.append(typedKey, details[typedKey] as any);
  });

  try {
    const response = await instance.post(updateProfile, formData,{
      
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user details.:", error);
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
