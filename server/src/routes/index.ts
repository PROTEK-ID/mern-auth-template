import { Router } from "express";
import authRoute from "./auth";

const apiRouterHandler = Router();
apiRouterHandler.use("/auth", authRoute);

export default apiRouterHandler;
