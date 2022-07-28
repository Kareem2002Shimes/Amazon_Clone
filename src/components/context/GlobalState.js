import { React, createContext, useReducer } from "react";
import AppReducer, { initialState } from "./AppReducer";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <GlobalContext.Provider
      value={{ basket: state.basket, user: state.user, dispatch: dispatch }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
