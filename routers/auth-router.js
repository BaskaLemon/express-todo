import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-models.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Body must have username and password" });
  }

  const existingUser = await UserModel.findOne({ username: username });

  if (existingUser) {
    return res.status(400).send({ message: "Username already exists" });
  }

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
  if (!regex.test(password)) {
    return res.status(400).send({
      message: `
Password must contain:
- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number
- One special character
    `,
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await UserModel.create({
    _id: nanoid(),
    username,
    password: hashedPassword,
  });
  return res.send(newUser);
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Body must have username and password" });
  }

  const existingUser = await UserModel.findOne({ username: username });

  if (!existingUser) {
    return res.status(401).send({ message: "Wrong credentials" });
  }

  const isMatching = bcrypt.compareSync(password, existingUser.password);

  if (!isMatching) {
    return res.status(401).send({ message: "Wrong credentials" });
  }
  const { password: hashedPassword, ...userWithoutPassword } =
    existingUser.toJSON;

  const accessToken = jwt.sign(userWithoutPassword, process.env.AUTH_SECRET, {
    expiresIn: "5m",
  });

  return res.send({ message: "Successfully signedin", accessToken });
});

router.get("/me", (req, res) => {
  const rawToken = req.headers.authorization;
  if (!rawToken.startsWith("Bearer")) {
    return res.status(401).send({ message: "Invalid token" });
  }
  const token = rawToken.split(" ")[1];

  let payload = null;
  try {
    payload = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (e) {
    return res.status(401).send({ message: "Invalid token" });
  }

  const existingUser = users.find((user) => user.id === payload.id);

  return res.send(existingUser);
});

export default router;
