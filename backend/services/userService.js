import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import createToken from "../utils/generateToken.js";

const registerUserService = async ({ name, email, password }) => {
  // Check if user exists
  const exist = await userModel.findOne({ email });

  if (exist) {
    throw new Error("User already exists");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  // Validate password
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate token
  const token = createToken(user._id);

  return {
    token,
    user,
  };
};

const loginUserService = async ({ email, password }) => {

  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = createToken(user._id);

  return {
    token,
    user,
  };
}

export { registerUserService, loginUserService };