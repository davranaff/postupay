import {createContext, useContext} from "react";


export const TestContext = createContext(null)
export const useTestContext = _ => useContext(TestContext)