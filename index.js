import express from "express";
import todoRouter from "./routers/todo-router.js";
import authRouter from "./routers/auth-router.js";
import mongoose from "mongoose";
import { UserModel } from "./models/user-models.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find;
  return res.send(users);
});

app.listen(PORT, async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Server is running on http://localhost:" + PORT);
});
