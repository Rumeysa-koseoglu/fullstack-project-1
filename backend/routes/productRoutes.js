//this file creates a "router": connects paths to the controller functions

import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
//we imported with {} because productController uses named export (export const ...)

//it acts like a mini-app. when mounted in server.js (like 'app.use("/api/products", router)') the path "/" in router
//turns actually into "/api/products"
const router = express.Router();

//GET /api/products -> getAllProducts will run
router.get("/", getAllProducts);
router.get("/:id", getProduct);
//POST /api/products -> createProduct will run
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router; // server.js imports this default export and mount
