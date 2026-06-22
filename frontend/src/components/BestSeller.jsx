import React from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {

  const { products } = React.useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = React.useState([]);

  const maxProductsToShow = 5;

  React.useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products].filter(p => p.bestseller).sort((a, b) => new Date(b.date) - new Date(a.date));
      setBestSellerProducts(sortedProducts.slice(0, maxProductsToShow));
    }
  }, [products]);

  return (
        <div className="my-10">
          <div className="text-center py-8 text-3xl">
            <Title text1="BEST" text2="SELLERS" />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ea possimus consequuntur officiis quaerat autem et harum.
            </p>
          </div>
    
          {/* Rendering Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
              bestSellerProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))
            }
          </div>
    
        </div>
  )
}

export default BestSeller