import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try{

    const { productId, size } = req.body;
    const userId = req.userId || req.body.userId;

    const userData = await userModel.findById(userId);
    if(!userData) {
      return res.status(404).json({ success:false, message: "User not found" });
    }

    let cartData = await userData.cartData;

    if(cartData[productId]) {
      if(cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cartData });

    return res.status(200).json({ success:true, message: "Product added to cart successfully", cartData: cartData });

  } catch(error) {
    return res.status(500).json({ success:false, message: error.message });
  }
}

const updateCart = async (req, res) => {
  try {

    const { productId, size, quantity } = req.body;
    const userId = req.userId || req.body.userId;

    const userData = await userModel.findById(userId);
    if(!userData) {
      return res.status(404).json({ success:false, message: "User not found" });
    }

    let cartData = await userData.cartData;

    if(cartData[productId] && cartData[productId][size]) {
      if(quantity > 0) {
        cartData[productId][size] = quantity;
      } else {
        delete cartData[productId][size];
        if(Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId];
        }
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cartData });
    return res.status(200).json({ success:true, message: "Cart updated successfully", cartData: cartData });

  } catch(error) {
    return res.status(500).json({ success:false, message: error.message });
  }
}


const getUserCart = async (req, res) => {
  try {

    const userId = req.userId || req.body.userId;

    const userData = await userModel.findById(userId);

    if(!userData) {
      return res.status(404).json({ success:false, message: "User not found" });
    }

    return res.status(200).json({ success:true, message: "User cart fetched successfully", cartData: userData.cartData });

  } catch(error) {
    return res.status(500).json({ success:false, message: "Error fetching user cart" });
  }
}

export { addToCart, updateCart, getUserCart }