import {createContext, useContext} from "react";


export const SignUpContext = createContext(null)
export const useSingUpContext = _ => useContext(SignUpContext)