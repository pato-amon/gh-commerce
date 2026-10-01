import { Router } from "express";

import {
    getProduct,
    getProducts,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createNewProduct);
router.patch("/:id", updateExistingProduct);
router.delete("/:id", deleteExistingProduct);

export default router;