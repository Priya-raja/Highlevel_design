import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findPublicUserById,
   findUserByUsernameOrEmail,
  findUserByEmail,
} from "../repositories/auth.repository.js";

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );
};

const toPublicUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  lastSeen: user.lastSeen,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    const error = new Error("Username, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();
const normalizedUsername = username.trim();

const existingUser = await findUserByUsernameOrEmail({
  username: normalizedUsername,
  email: normalizedEmail,
});

if (existingUser) {
  const error = new Error("User already exists");
  error.statusCode = 409;
  throw error;
}

  const hashedPassword = await bcrypt.hash(password, 12);
const user = await createUser({
  username: normalizedUsername,
  email: normalizedEmail,
  password: hashedPassword,
});

  const token = createToken(user);

  return {
    user: toPublicUser(user),
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(email.toLowerCase().trim());

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = createToken(user);

  return {
    user: toPublicUser(user),
    token,
  };
};

export const getAuthenticatedUser = async (userId) => {
  const user = await findPublicUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return toPublicUser(user);
};
