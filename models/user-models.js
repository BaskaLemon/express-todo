import mongoose from "mongoose";

const UserScema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const UserModel = mongoose.model("todo", UserSchema);
