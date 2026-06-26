import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = '$';
    const delivery_fee = 10;
    const categories = ['Men', 'Women', 'Kids'];
    const subcategories = ['Topwear', 'Bottomwear', 'Winterwear'];
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = (id, size, color=null) => {
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

    const getCartCount = () => {
        let count = 0;
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                try{
                    count += cartItems[productId][size];
                } catch (error) {
                    toast.error(`Error accessing cartItems[${productId}][${size}]:`, error);
                }
            }
        }
        return count;
    }

    const getCartAmount = () => {
        let amount = 0;
        for( const items in cartItems){
            let iteminfo = products.find((product) => product._id === items);
            for( const size in cartItems[items]){
               try{
                    if (cartItems[items][size] > 0 && iteminfo) {
                        amount += iteminfo.price * cartItems[items][size];
                    }
                } catch (error) {
                    toast.error(`Error accessing cartItems[${items}][${size}]:`, error);
                }
            }
        }
        return amount;
    }

    const updateQuantity = async (id, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[id][size] = quantity;
        setCartItems(cartData);
    }

    useEffect(() => {
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const value = {
        products,
        currency,
        delivery_fee,
        categories,
        subcategories,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;