import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { createToken } from "../utils/generateToken.js";

const registerUserService = async ({ name, email, password }) => {
  const exist = await userModel.findOne({ email });
  if (exist) {
    throw new Error("User already exists");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = createToken(user._id);
  return {
    token,
    user,
  };
};

const loginUserService = async ({ email, password }) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = createToken(user._id);
  return {
    token,
    user,
  };
}

const loginAdminService = async (email, password) => {
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new Error("Invalid admin credentials");
  }
  const token = createToken(email + password, process.env.JWT_SECRET);
  return token;
};

export { registerUserService, loginUserService, loginAdminService };