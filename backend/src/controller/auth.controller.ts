import { AsynFunctionType } from "../shared/types";

import { validationResult } from "express-validator";

import User from "../models/user.model";

import bcrypt from "bcrypt";

import { getToken } from "../shared/getToken";

export const loginHandler: AsynFunctionType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.cookie("auth_token", getToken(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day in milliseconds
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

export const validateTokenHandler: AsynFunctionType = async (req, res) => {
  return res.status(200).send({ userId: req.userId });
};

export const logoutHandler: AsynFunctionType = async (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};
