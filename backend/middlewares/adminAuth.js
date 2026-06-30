import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    if (decoded.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      throw new Error("User is not an admin");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

export default adminAuth;