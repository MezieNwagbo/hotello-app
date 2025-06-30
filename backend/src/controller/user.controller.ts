import { AsynFunctionType } from "../shared/types";

import { validationResult } from "express-validator";

import User from "../models/user.model";
import jwt from "jsonwebtoken";

import { getToken } from "../shared/getToken";

export const registerHandler: AsynFunctionType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User(req.body);
    //password is hashed in the user model'
    await user.save();

    res.cookie("auth_token", getToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day in milliseconds
    });

    return res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getLoggedInUserHandler: AsynFunctionType = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
