import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || "3002";

app.listen(3003, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

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

let products = [
  { id: "1", name: "iphone 15", price: 3000 },
  { id: "2", name: "smart watch", price: 300 },
  { id: "3", name: "headphones", price: 100 },
];

app.get("/products", (req, res) => {
  res.status(200).json({
    message: "all products are returned",
    payload: products,
  });
});

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
