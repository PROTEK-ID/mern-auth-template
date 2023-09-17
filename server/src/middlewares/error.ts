import { ErrorRequestHandler } from "express";
import env from "../config/env";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error.message) {
    console.error(error);
    return res.status(res.statusCode || 500).json({
      message: error.message,
      stack: env?.NODE_ENV === "production" ? null : error.stack,
    });
  }
  next();
};

export default errorMiddleware;
