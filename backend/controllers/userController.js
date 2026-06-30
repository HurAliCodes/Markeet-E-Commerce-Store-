import { registerUserService, loginUserService, loginAdminService } from "../services/userService.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token } = await loginUserService({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const { token } = await registerUserService({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      token,
      message: "User created successfully",
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginAdminService(email, password);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser, adminLogin };