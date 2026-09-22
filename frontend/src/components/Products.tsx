import ProductCard from "./ProductCard";

type Product = {
    id: number;
    name: string;
    price: number;
};

type ProductsProps = {
    products: Product[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;

};

function Products({ products, onEdit, onDelete }: ProductsProps) {
    if (products.length === 0) {
        return <p>No products available.</p>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default Products;