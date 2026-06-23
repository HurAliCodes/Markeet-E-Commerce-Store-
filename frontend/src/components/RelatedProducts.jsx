import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({
  category,
  subCategory
}) => {

  const { products } = useContext(ShopContext);
  const [ relatedProducts, setRelatedProducts ] = useState([]);

  // =============== FUNCTIONS ======================

  const fetchRelatedProducts = () => {
    const related = products.filter(p => p.category === category && p.subCategory === subCategory);
    setRelatedProducts(related);
    console.log('Related Products:', related);
  }

  // =============== USE EFFECT ====================
  useEffect(() => {
    fetchRelatedProducts();
  }, [products, category, subCategory]);

  return (
    <div className="my-14">
      <div className='text-center text-3xl py-2'>
        <Title text1={'Related'} text2={'Products'} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product) => (
          <ProductItem 
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts