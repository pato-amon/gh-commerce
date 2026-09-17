import express from "express";
import prisma from "./prisma";
import {
    validateProductName,
    validateProductPrice
} from "./validators/productValidator";
import { getProducts, getProduct, createNewProduct, updateExitingProduct, deleteExistingProduct } from "./controllers/productController";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Ghana Commerce API is running"
    });
});

// GET all products from PostgreSQL
app.get("/api/products", getProducts);

// GET a single product by ID from PostgreSQL
app.get("/api/products/:id", getProduct);

// POST create a new product in PostgreSQL
app.post("/api/products", createNewProduct);

// PATCH update a product in PostgreSQL
app.patch("/api/products/:id", updateExitingProduct);

// DELETE a product from PostgreSQL
app.delete("/api/products/:id", deleteExistingProduct);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})