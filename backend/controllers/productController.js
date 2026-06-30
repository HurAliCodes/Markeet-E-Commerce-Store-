import cloudinary from "../utils/cloudinary.js"

const addProduct = async (req, res) => {
  try {

      const { name, description, price, category, subCategory, sizes, bestseller } = req.body

      const image1 = req.files.image1?.[0]
      const image2 = req.files.image2?.[0]
      const image3 = req.files.image3?.[0]
      const image4 = req.files.image4?.[0]

      const images = [image1, image2, image3, image4].filter(item => item !== undefined || item !== null);
    
      let imagesUrl = await Promise.all(images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image.path, {
              folder: "products"
          })
          return result.secure_url
      }))

      console.log(name, description, price, category, subCategory, sizes, bestseller)
      console.log(image1,image2,image3,image4);

      res.json({
        success: true,
        message: "Product added successfully"
    })
  } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
  }
}


const listProducts = async (req, res) => {

}

const removeProduct = async (req, res) => {

}

const singleProduct = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct };