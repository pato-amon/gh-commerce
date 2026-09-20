import { useState } from "react";

type Product = {
    id: number;
    name: string;
    price: string;
};

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    const [addedToCart, setAddedtoCart] = useState(false);
    function handleAddToCart() {
        setAddedtoCart(true);
    }
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Price: GHS {product.price}</p>
            <p>Product ID: {product.id}</p>
            <button onClick={handleAddToCart}>
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}</button>
        </div>
    );
}

export default ProductCard;