import { createContext } from "react";
import { deeds } from "../assets/assets";


export const DeedContext = createContext();

const DeedContextProvider = (props) =>{

    const value = {
        deeds
    }

    return (
        <DeedContext.Provider value={value}>
            {props.children}
        </DeedContext.Provider>
    )
}

export default DeedContextProvider;