import { createContext } from "react";
import { products } from "../assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = '$';
    const dilevery_fee = 10;

    const value = {
        products,
        currency,
        dilevery_fee
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;