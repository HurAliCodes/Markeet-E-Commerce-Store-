import React from 'react'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { Search, X } from 'lucide-react'

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if(!location.pathname.includes('/collection')){
      setShowSearch(false);
    }}, [location.pathname, setShowSearch]);

  return showSearch ? (
    <div className='border-t bg-gray-50 text-center'>
      <div className='inline-flex bg-white items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
        />
        <Search className='w-5 h-5 text-gray-400 cursor-pointer hover:text-shop_light_green hoverEffect' />
      </div>
      <X className='w-5 h-5 text-gray-400 inline cursor-pointer hover:text-shop_light_green hoverEffect' onClick={() => setShowSearch(false)} />
    </div>
  ) : null;
}

export default SearchBar