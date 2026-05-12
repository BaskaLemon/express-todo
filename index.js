import express from "express";
import fs from "fs";

import todoRouter from "./routers/todo-router.js";
import authRouter from "./routers/auth-router.js";
import mongoose from "mongoose";
import { UserModel } from "./models/user-models.js";

const app = express();
app.use(express.json());

app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find;
  return res.send(users);
});

app.listen(5400, async () => {
  await mongoose.connect(
    "mongodb+srv://erdenebayarbaasandorj89_db_user:4VCFKz5yProsBuNQ@cluster0.gxvjrc3.mongodb.net/todo-app",
  );
  console.log("Server is running on http://localhost:5400");
});
