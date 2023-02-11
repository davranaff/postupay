import {createContext, useContext} from "react";


export const SignInContext = createContext(null)
export const useSingInContext = _ => useContext(SignInContext)