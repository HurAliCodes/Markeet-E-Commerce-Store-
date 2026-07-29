import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import ReviewSection from "../components/Reviews/ReviewSection";
import ProductRating from "../components/Reviews/ProductRating";

const Product = () => {

  const { productId } = useParams();
  const { currency, products, addToCart } = useContext(ShopContext);
  const [ productData, setProductData ] = useState(null);
  const [ productImage, setProductImage ] = useState(null);
  const [ selectedSize, setSelectedSize ] = useState(null);

  // =============== FUNCTIONS ======================

  const fetchProductData = (id) => {
    const product = products.find(p => p._id === id);
    setProductData(product);
    setProductImage(product?.images?.[0] || null);
    setSelectedSize(product?.sizes[0] || null);
  }

  // =============== USE EFFECT ====================
  useEffect(() => {
    fetchProductData(productId);
  }, [productId, products]);

  useEffect(() => {
    
  }, 
  [productData]);

  return productData ? (
    <div className="pt-10 hoverEffect opacity-100">
      {/* --------------- Product Data --------------- */}

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">
        {/* ----------- Product Image ------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full h-full">
            {productData.images.map((img, index) => (
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
            <ProductRating productId={productId} />
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
            {/* <button className="uppercase bg-white text-black border border-black px-8 py-3 hover:bg-gray-100 rounded text-sm active:scale-98 flex-1">Add to Wishlist</button> */}
          </div>
          <hr className="my-8" />
          <div className="mt-5 text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Pay on delivery might be available</p>
            <p>Easy 30 days returns and exchanges</p>
          </div>
        </div>
      </div>

      <ReviewSection
        productId={productId}
        description={productData.description}
      />

      {/* -------------- Display Related Products ------------------ */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : (
    <p>Product not found</p>
  );
}

export default Product