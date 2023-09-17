import expressAsyncHandler from "express-async-handler";
import User from "../models/user";
import { generateAccessToken, verifyToken } from "../libs/token";

export const refreshTokenMiddleware = expressAsyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const user = await User.findOne({
      where: {
        refreshToken,
      },
    });
    if (!user) {
      res.status(403);
      throw new Error("Forbidden");
    }
    verifyToken(refreshToken, (error, decoded) => {
      if (error) {
        res.status(403);
        throw new Error("Forbidden");
      }
      const accessToken = generateAccessToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    throw error;
  }
});
