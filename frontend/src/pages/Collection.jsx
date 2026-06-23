import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ChevronDown } from 'lucide-react'

const Collection = () => {
  
  const { products, categories, subcategories, sortTypes, search, setSearch, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  // ================== Functions ======================

  const sortProducts = (sortBy) => {
    let sorted = [...filterProducts];
  
    switch(sortBy){
      case 'low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setFilterProducts(sorted);
  }

  const applyFilter = () => {
    let filtered = products;

    if(showSearch){
      filtered = filtered.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length > 0){
      filtered = filtered.filter(product => category.includes(product.category));
    }
    if(subcategory.length > 0){
      filtered = filtered.filter(product => subcategory.includes(product.subCategory));
    }
    setFilterProducts(filtered); 
  }

  const toggleCategory = (cat) => {
    if(category.includes(cat)){
      setCategory(prev => prev.filter(item => item !== cat));
    } else {
      setCategory(prev => [...prev, cat]);
    }
  }

  const toggleSubcategory = (subcat) => {
    if(subcategory.includes(subcat)){
      setSubcategory(prev => prev.filter(item => item !== subcat));
    } else {
      setSubcategory(prev => [...prev, subcat]);
    }
  }

  // ================== Use Effects ====================
  
  useEffect(() => {
    setFilterProducts(products);
  },[products]);

  useEffect(applyFilter, [category, subcategory, search, showSearch]);


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* Filter Options */}
      <div className='min-w-60 mb-10'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <ChevronDown className={`h-5 sm:hidden ${showFilter ? '' : '-rotate-90'}`} />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`} >
          <p className='text-sm font-medium mb-3 uppercase'>category</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((category, index) => (
              <label key={index} className='flex items-center gap-2 cursor-pointer w-fit'>
                <input type="checkbox" className='w-4 h-4 cursor-pointer customCheckBox' onChange={()=>toggleCategory(category)}/>
                {category}
              </label>
            ))}
          </div>
        </div>
        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`} >
          <p className='text-sm font-medium mb-3 uppercase'>subcategory</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subcategories.map((subcategory, index) => (
              <label key={index} className='flex items-center gap-2 cursor-pointer w-fit'>
                <input type="checkbox" className='w-4 h-4 cursor-pointer customCheckBox' onChange={()=>toggleSubcategory(subcategory)}/>
                {subcategory}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2 cursor-pointer' onChange={(e)=>sortProducts(e.target.value)}>
            <option value='relavent'>Sort by Relevance</option>
            <option value='low'>Price: Low to High</option>
            <option value='high'>Price: High to Low</option>
            <option value='newest'>Newest First</option>
            <option value='oldest'>Oldest First</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((product, index) => {
              return (
                <ProductItem 
                  key={index}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default Collection