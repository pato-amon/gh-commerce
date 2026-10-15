import { Request, Response, NextFunction } from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../services/productService";

import {
    validateProductName,
    validateProductPrice
} from "../validators/productValidator"

export async function getProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products = await getAllProducts();

        res.json(products);
    } catch (error) {
        next(error);
    }
}

export async function getProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function createNewProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, price, sku } = req.body;

    const nameError = validateProductName(name);
    if (nameError) {
        return res.status(400).json({
            message: nameError
        });
    }

    const priceError = validateProductPrice(price);
    if (priceError) {
        return res.status(400).json({
            message: priceError
        });
    }

    try {
        const product = await createProduct(name, price, sku);
        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

export async function updateExistingProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    if (name !== undefined) {
        const nameError = validateProductName(name);
        if (nameError) {
            return res.status(400).json({
                message: nameError
            })
        }
    }

    if (price !== undefined) {
        const priceError = validateProductPrice(price);
        if (priceError) {
            return res.status(400).json({
                message: priceError
            });
        }
    }

    const data: { name?: string; price?: number } = {};

    if (name !== undefined) {
        data.name = name;
    }
    if (price !== undefined) {
        data.price = price;
    }

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

    try {
        const updatedProduct = await updateProduct(id, data);
        return res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

export async function deleteExistingProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    try {
        const deletedProduct = await deleteProduct(id);

        return res.json({
            message: "Product deleted successfully",
            product: deletedProduct
        })
    } catch (error) {
        next(error);
    }
}
