import mongoose from "mongoose";

const UserScema = new mongoose.Schema({
  _id: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const UserModel = mongoose.model("users", UserSchema);
