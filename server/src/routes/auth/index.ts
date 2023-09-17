import { Router } from "express";
import { getUsers, postUser, signinUser, signoutUser } from "./controller";
import { verifyTokenMiddleware } from "../../middlewares/verifyToken";
import { refreshTokenMiddleware } from "../../middlewares/refreshToken";

const authRoute = Router();
authRoute.route("/").get(verifyTokenMiddleware, getUsers).post(postUser);
authRoute.post("/signin", signinUser);
authRoute.route("/token").get(refreshTokenMiddleware).delete(signoutUser);

export default authRoute;
