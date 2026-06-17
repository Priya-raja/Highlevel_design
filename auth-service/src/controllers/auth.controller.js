import {
  getAuthenticatedUser,
  loginUser,
  registerUser,
  getUsersExceptCurrentUser
} from "../services/auth.service.js";

const handleError = (res, error) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

export const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const me = async (req, res) => {
  try {
    const user = await getAuthenticatedUser(req.user.userId);

    res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    
    const users = await getUsersExceptCurrentUser(req.user.userId);

    res.json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};