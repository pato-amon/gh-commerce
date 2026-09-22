import { useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
};

type ProductCardProps = {
    product: Product;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const [addedToCart, setAddedtoCart] = useState(false);
    function handleAddToCart() {
        setAddedtoCart(true);
    }
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Price: GHS {product.price}</p>
            <p>Product ID: {product.id}</p>

            <button onClick={() => onEdit(product.id)}>Edit</button>

            <button onClick={() => onDelete(product.id)}>Delete</button>

            <button onClick={handleAddToCart}>
                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}</button>
        </div>
    );
}

export default ProductCard;