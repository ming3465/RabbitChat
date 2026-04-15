import express from "express";
import cors from "cors";
import helmet from "helmet";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiRouter } from "./routes/index.js";
import { clerkMiddleware } from "@clerk/express";
// 1. Import your validated environment variables
import { env } from "./config/env.js";

export function createApp() {
  const app = express();

  app.use(helmet());

  app.use(
    cors({
      origin: [env.FRONTEND_URL],
      credentials: true,
    })
  );

  app.get("/", (_req, res) => {
    res.json({ message: "Backend is running smoothly!" });
  });

  app.use(express.json());

  // 2. Pass the keys directly to the middleware
  app.use(
    clerkMiddleware({
      publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: env.CLERK_SECRET_KEY,
    })
  );

  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}