import { check } from "express-validator";

export const productIdValidator = [
  check("id").isNumeric().withMessage("product id must be number"),
];
