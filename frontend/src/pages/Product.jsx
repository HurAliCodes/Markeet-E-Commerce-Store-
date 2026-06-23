import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { ChevronDown, Star } from 'lucide-react';
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const { productId } = useParams();
  const { currency, products, addToCart } = useContext(ShopContext);
  const [ productData, setProductData ] = useState(null);
  const [ productImage, setProductImage ] = useState(null);
  const [ selectedSize, setSelectedSize ] = useState(null);
  const [ activeTab, setActiveTab ] = useState('description');

  const dummyReviews = [
    {
      name: 'John Doe',
      rating: 4.0,
      comment: 'Great product! Really satisfied with the quality and fit.'
    },
    {
      name: 'Jane Smith',
      rating: 5.0,
      comment: 'Absolutely love it! The material is so soft and comfortable.'
    },
    {
      name: 'Alice Johnson',
      rating: 3.0,
      comment: 'It’s a decent product, but the sizing was a bit off for me.'
    }
  ]

  // =============== FUNCTIONS ======================

  const fetchProductData = (id) => {
    const product = products.find(p => p._id === id);
    setProductData(product);
    setProductImage(product?.image[0] || null);
    setSelectedSize(product?.sizes[0] || null);
  }

  // =============== USE EFFECT ====================
  useEffect(() => {
    fetchProductData(productId);
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 hoverEffect opacity-100">
      {/* --------------- Product Data --------------- */}

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">
        {/* ----------- Product Image ------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full h-full">
            {productData.image.map((img, index) => (
              <img key={index} src={img} alt={`Product ${index + 1}`} className={`w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer ${productImage === img ? 'border-2 border-black' : ''}`} onClick={() => setProductImage(img)} />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={productImage} alt="Product" className="w-full h-auto" />
          </div>
        </div>

        {/* ----------- Product Info ------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <Ratings rating={productData.rating} />
            <span className='text-sm text-gray-500'>({productData.rating_count})</span>
          </div>
          <p className="text-lg font-normal mt-2">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button key={index} className={`text-sm border border-gray-300 px-3.5 py-2 rounded ${selectedSize === size ? 'bg-black text-white' : ' hover:bg-gray-100'}`} onClick={() => setSelectedSize(size)}>{size}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={()=>{addToCart(productData._id, selectedSize)}} className="uppercase bg-black text-white px-8 py-3 hover:bg-gray-800 rounded text-sm active:scale-98 flex-1">Add to Cart</button>
            <button className="uppercase bg-white text-black border border-black px-8 py-3 hover:bg-gray-100 rounded text-sm active:scale-98 flex-1">Add to Wishlist</button>
          </div>
          <hr className="my-8" />
          <div className="mt-5 text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Pay on delivery might be available</p>
            <p>Easy 30 days returns and exchanges</p>
          </div>
        </div>
      </div>

      {/* Description And Reviews */}
      <div className="mt-10">
        <div className="flex">
          <button 
            className={`px-5 py-3 text-sm ${activeTab === 'description' ? 'border-b-2 border-black' : ''}`} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`px-5 py-3 text-sm ${activeTab === 'reviews' ? 'border-b-2 border-black' : ''}`} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({productData.rating_count})
          </button>
        </div>
          {
            activeTab === 'reviews'  ? (
              <div className="flex flex-col gap-2 px-6 pl-0 py-6 text-sm text-gray-500 mt-4">
                {dummyReviews.map((review, index) => (
                  <div key={index} className="flex flex-col gap-2 border border-gray-200 py-6 px-3 rounded bg-gray-50">
                    <p className="flex items-center gap-2 justify-between">
                      <span className="font-bold text-base">{review.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{review.rating.toFixed(1)}</span>
                        <Ratings rating={review.rating} size={3} />
                      </div>
                    </p>
                    <p className="text-gray-500 font-light">{review.comment}</p>
                  </div>
                ))}
                <hr className="mt-3 border-gray-200" />
                <div className="flex items-center justify-start w-max hover:text-shop_light_green hoverEffect text-black cursor-pointer">
                  <button className="">View All Reviews</button>
                  <ChevronDown className="w-5 mt-1 text-gray-500" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-6 pl-0 py-6 text-sm text-gray-500 mt-4">
                <p>{productData.description}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
              </div>
            )
          }
      </div>

      {/* -------------- Display Related Products ------------------ */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : (
    <p>Product not found</p>
  );
}

const Ratings = ({ rating, size=4 }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`${i < rating ? 'text-amber-300 fill-amber-300' : 'text-gray-300'}`}
        width={size * 4}
        height={size * 4}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

export default Product