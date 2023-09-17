import expressAsyncHandler from "express-async-handler";
import { genSalt, hash, compare } from "bcryptjs";
import User from "../../models/user";
import env from "../../config/env";
import { generateAccessToken, generateRefreshToken } from "../../libs/token";
import { validateEmailAndPassword } from "../../utils/validate";

// @route GET /
export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.findAndCountAll({
    attributes: ["id", "email", "username"],
  });
  res.status(200).json(users);
});

// @route POST /
export const postUser = expressAsyncHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const { emailValid, passwordValid } = validateEmailAndPassword(
      email,
      password
    );
    if (!emailValid || !passwordValid) {
      res.status(400).json({
        message: "Invalid data",
        data: {
          emailValid,
          passwordValid,
        },
      });
      return;
    }
    if (await User.findOne({ where: { email } })) {
      res.status(400);
      throw new Error("User already exist");
    }
    if (!password) {
      res.status(400);
      throw new Error("Password cannot be empty");
    }
    const salt = await genSalt(15);
    const hashedPassword = await hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User successfully created", data: newUser.dataValues });
  } catch (error) {
    throw error;
  }
});

// @route POST /signin
export const signinUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const { emailValid, passwordValid } = validateEmailAndPassword(
      email,
      password
    );
    if (!emailValid || !passwordValid) {
      res.status(400).json({
        message: "Invalid data",
        data: {
          emailValid,
          passwordValid,
        },
      });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400);
      throw new Error(`No user found with email: ${email}`);
    }
    if (!(await compare(password, user.getDataValue("password")))) {
      res.status(400);
      throw new Error("Wrong password");
    }
    const id = user.getDataValue("id"),
      username = user.getDataValue("username");

    const accessToken = generateAccessToken({ id, username, email });
    const refreshToken = generateRefreshToken({ id, username, email });

    await User.update(
      { refreshToken },
      {
        where: {
          email,
        },
        silent: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: env?.NODE_ENV === "production" ? true : false,
    });
    res.status(201).json({ accessToken });
  } catch (error) {
    throw error;
  }
});

export const signoutUser = expressAsyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(204);
    throw new Error("No content");
  }
  const user = await User.update(
    {
      refreshToken: null,
    },
    {
      where: {
        refreshToken,
      },
      silent: true,
    }
  );
  res.clearCookie("refreshToken").status(200).json({ message: "User signout" });
});
