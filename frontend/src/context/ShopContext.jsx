import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const currency = '$';
    const delivery_fee = 10;
    const categories = ['Men', 'Women', 'Kids'];
    const subcategories = ['Topwear', 'Bottomwear', 'Winterwear'];
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    const addToCart = async (id, size) => {
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

        try {
            if (token) {
                await apiClient.post(`${backendUrl}/api/cart/add`, { productId: id, size });
            }
        }
        catch(error){
            toast.error("Failed to add item to cart" + (error.response?.data?.message ? `: ${error.response.data.message}` : ''));
        }
        
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

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            const data = response.data;
            if (data.success) {
                console.log('Fetched products:', data.products);
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch products");
        }
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
    
    const getUserCart = async () => {

        try {
            const response = await apiClient.post('/api/cart/get',{});
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
                console.log('Cart Items after fetching user cart:', cartItems);
            }   
        } catch (error) {
            toast.error("Failed to fetch cart items");
        }
    }

    const updateQuantity = async (id, size, quantity) => {
        if (Number.isNaN(quantity)) {
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[id]) {
            cartData[id] = {};
        }

        if (quantity > 0) {
            cartData[id][size] = quantity;
        } else {
            delete cartData[id][size];

            if (Object.keys(cartData[id]).length === 0) {
                delete cartData[id];
            }
        }

        setCartItems(cartData);

        try {
            if (token) {
                await apiClient.post(`/api/cart/update`, { productId: id, size, quantity });
            }
        } catch (error) {
            toast.error("Failed to update cart item" + (error.response?.data?.message ? `: ${error.response.data.message}` : ''));
        }
    }
 
    useEffect(() => {
        getProductsData();
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            getUserCart();
        }
    }, [token]);

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
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        getUserCart
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;