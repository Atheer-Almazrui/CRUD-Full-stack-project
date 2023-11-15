import { Router } from "express";
import "dotenv/config";

import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { productIdValidator } from "../validator/productValidator.js";
import { runValidation } from "../validator/index.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", productIdValidator, runValidation, getSingleProduct);
productRouter.delete("/:id", productIdValidator, runValidation, deleteProduct);
productRouter.post("/", createProduct);
productRouter.put("/:id", productIdValidator, runValidation, updateProduct);

export default productRouter;
