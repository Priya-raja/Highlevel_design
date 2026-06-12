import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);



export default mongoose.model("User", userSchema);
