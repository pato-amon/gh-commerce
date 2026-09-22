import React, { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/Products";

type Product = {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingProduct, setEditingProduct]
    = useState<Product | null>(null);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const response = await fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: Number(price),
        }),
      });

      const data = await response.json();

      console.log(data);

      setEditingProduct(null);
    } else {

      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
        }),
      });

      const data = await response.json();

      console.log(data);

      setName("");
      setPrice("");

      fetchProducts();

    }
  };

  const handleEdit = (id: number) => {
    const product = products.find((product) => product.id === id);

    if (!product) {
      return;
    }

    setEditingProduct(product);
    setName(product.name);
    setPrice(String(product.price));
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    }
    );
    const data = await response.json();

    console.log(data);
    fetchProducts();
  }


  return (
    <div className="container">
      <h1>Ghana Commerce</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <h2>Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">{editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <Products
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}


export default App;