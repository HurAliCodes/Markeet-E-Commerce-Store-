import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ success:false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.body = req.body || {};
    req.body.userId = decoded.id;
    next();

  } catch (error) {

    return res.status(401).json({ success:false, message: "Invalid token", error: error.message });
    
  }
};

export default authUser;