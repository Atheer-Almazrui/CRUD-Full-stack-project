import { Router } from "express";
import "dotenv/config";
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getSingleProduct);
productRouter.delete("/products/:id", deleteProduct);
productRouter.post("/products", createProduct);
productRouter.put("/products/:id", updateProduct);

export default productRouter;
