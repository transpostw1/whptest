"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "@/app/config";
import { WindowsLogo } from "@phosphor-icons/react";

interface UserState {
  isLoggedIn: boolean;
}

type UserAction = { type: "LOG_IN" } | { type: "LOG_OUT" };

interface UserContextProps {
  userState: UserState;
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const initialState: UserState = {
  isLoggedIn: typeof window !== 'undefined' && localStorage.getItem("isLoggedIn") === "true",
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  const userDetails = auth.currentUser;
  const user = userDetails?.uid;

  switch (action.type) {
    case "LOG_IN":
      if (typeof window !== 'undefined') {
        localStorage.setItem("isLoggedIn", "true");
      }
      return {
        isLoggedIn: true,
      };
    case "LOG_OUT":
      if (typeof window !== 'undefined') {
        localStorage.setItem("isLoggedIn", "false");
      }
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const logIn = () => {
    dispatch({ type: "LOG_IN" });
  };

  const logOut = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <UserContext.Provider value={{ userState, logIn, logOut}}>
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