import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

import productRouter from "../backend/routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || "3002";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "too many requests within 1 minutes",
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// to make request from frontend
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productRouter);

// client error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// server error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(3003, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
