"use client"
import React, { createContext } from "react";
export const UserContext = createContext("")

export const UserProvider = ({children})=>{
    const [dados,setDados]=React.useState([])
    const [loged,setLoged]=React.useState(false)


    return (
        <UserContext.Provider value={{dados,setDados,loged,setLoged}}>
            {children}
        </UserContext.Provider>
    )
}