import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets }  from "../assets";
import { Link, NavLink } from "react-router-dom";
import { Search, UserRound, ShoppingCart, TextAlignEnd, ArrowLeft } from 'lucide-react';

const NavBar = () => {

  const { showSearch, setShowSearch, getCartCount } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium border-b -mb-[1px]">

      <div className="flex items-center gap-2 max-h-10">
        <Link to="/"><img src={assets.logo} alt="logo" className="w-30 min-w-[120px]" /></Link>
      </div>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 relative top-1 -left-2">
        <NavLink to="/" className="flex flex-col items-center gap-1 group">
          <p className="uppercase group-hover:text-shop_light_green">Home</p>
          <hr className="w-0 border-none h-[1.5px] bg-shop_light_green group-hover:w-2/3 hoverEffect" />
        </NavLink>

        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 group"
        >
          <p className="uppercase group-hover:text-shop_light_green">Collection</p>
          <hr className="w-0 border-none h-[1.5px] bg-shop_light_green group-hover:w-2/3 hoverEffect" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1 group">
          <p className="uppercase group-hover:text-shop_light_green">About</p>
          <hr className="w-0 border-none h-[1.5px] bg-shop_light_green group-hover:w-2/3 hoverEffect" />
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 group"
        >
          <p className="uppercase group-hover:text-shop_light_green">Contact</p>
          <hr className="w-0 border-none h-[1.5px] bg-shop_light_green group-hover:w-2/3 hoverEffect" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Search className="w-5 min-w-5 cursor-pointer hover:text-shop_light_green hoverEffect" onClick={() => setShowSearch(!showSearch)} />
        <div className="group relative">
          <Link to="/login" className="bg-red-500">
          <UserRound className="w-5 min-w-5 cursor-pointer hover:text-shop_light_green hoverEffect" />
          <div className="group-hover:block cursor-pointer hidden absolute dropdown-menu right-0 top-5 pt-4">
            <div className='absolute w-2 h-2 bg-white border-l border-t border-gray-300 right-2 top-3 rotate-45'></div>
            <div className="flex flex-col w-36 py-2 bg-white border border-gray-300 text-gray-500 text-sm">
              <Link to="/profile" className="cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-2 border-shop_light_green px-2 py-1">My Profile</Link>
              <Link to="/orders" className="cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-2 border-shop_light_green px-2 py-1">Orders</Link>
              <Link to="/logout" className="cursor-pointer hover:text-black hover:bg-gray-200 hover:border-l-2 border-shop_light_green px-2 py-1">Logout</Link>
            </div>
          </div>
          </Link>
        </div>

        <Link to="/cart" className="relative">
          <ShoppingCart className="w-5 min-w-5 cursor-pointer hover:text-shop_light_green hoverEffect" />
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
            {getCartCount()}
          </div>
        </Link>
        <TextAlignEnd className="w-5 min-w-5 cursor-pointer sm:hidden" onClick={() => setVisible(true)} />
      </div>

      {/* Side Bar Menu */}
      <div className={`absolute top-0 left-0 w-screen h-screen bg-black/50 z-40 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setVisible(false)}></div>
      <div className={`absolute top-0 right-0 origin-right h-screen bg-white overflow-hidden hoverEffect z-50 transition-all duration-500 ${visible ? 'w-2/3' : 'w-0'}`} >
        <div className="flex flex-col text-gray-600 group">
          <div className="flex items-center gap-4 p-3 px-0 cursor-pointer group/back" onClick={() => setVisible(false)}>
            <ArrowLeft className="h-4 relative left-3 top-px group-hover/back:left-2 group-hover/back:text-black hoverEffect" />
            <p className="text-medium text-gray-500 font-medium group-hover/back:text-black">Back</p>
          </div>

          <div className="flex flex-col mt-10 text-lg">
            <NavLink to="/" className="px-5 py-3 border-t border-b hoverEffect hover:bg-shop_light_green hover:text-white" onClick={() => setVisible(false)}>HOME</NavLink>
            <NavLink to="/collection" className="px-5 py-3 border-b hoverEffect  hover:bg-shop_light_green hover:text-white" onClick={() => setVisible(false)}>COLLECTION</NavLink>
            <NavLink to="/about" className="px-5 py-3 border-b hoverEffect hover:bg-shop_light_green hover:text-white" onClick={() => setVisible(false)}>ABOUT</NavLink>
            <NavLink to="/contact" className="px-5 py-3  border-b hoverEffect hover:bg-shop_light_green hover:text-white" onClick={() => setVisible(false)}>CONTACT</NavLink>
          </div>

        </div>
      </div>

    </div>
  );
};

export default NavBar;
