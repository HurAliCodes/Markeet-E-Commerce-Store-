import { createContext, useState, useEffect } from "react";
import { products } from "../assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = '$';
    const dilevery_fee = 10;
    const categories = ['Men', 'Women', 'Kids'];
    const subcategories = ['Topwear', 'Bottomwear', 'Winterwear'];
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (id, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[id]) {
            if (cartData[id][size]) {
                cartData[id][size] += 1;
            } else {
                cartData[id][size] = 1;
            }
        } else {
            cartData[id] = {};
            cartData[id][size] = 1;
        }

        setCartItems(cartData);
    }

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const value = {
        products,
        currency,
        dilevery_fee,
        categories,
        subcategories,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;