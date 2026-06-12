import User from "../models/User.js";

export const createUser = async (userData) => {
  return User.create(userData);
};


export const findUserByEmail = async (email) => {
  return User.findOne({ email }).select("+password");
};

export const findUserByUsernameOrEmail = async ({ username, email }) => {
  return User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");
};

export const findPublicUserById = async (userId) => {
  return User.findById(userId).select("-password");
};
