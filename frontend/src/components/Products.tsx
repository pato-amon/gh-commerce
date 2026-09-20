import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
    id: number;
    name: string;
    price: string;
};

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3000/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    if (products.length === 0) {
        return <p>No products available.</p>
    }

    return (
        <div className="container">
            <h2>Products</h2>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;