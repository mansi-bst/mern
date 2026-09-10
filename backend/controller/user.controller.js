import { User } from "../schema/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const signup = async (req, res) => {
  try {
    const { Name, UserName, Email, Password } = req.body;

    if (!Name || !UserName || !Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (Password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password length must be of 6 characters",
      });
    }

    const existingUserEmail = await User.findOne({
      Email: Email,
    });

    if (existingUserEmail) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    await User.create({
      Name,
      UserName,
      Email,
      Password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(401).json({
        success: false,
        message: "Both fields are required",
      });
    }
    let user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(402).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.UserName}`,
        token: token,
        user: {
          _id: user._id,
          Name: user.Name,
          UserName: user.UserName,
          Email: user.Email,
          Address: user.Address,
          Contact: user.Contact,
        },
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
