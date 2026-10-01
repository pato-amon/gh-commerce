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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    setError("");

    if (name.trim() === "") {
      setError("Product name is required");
      return;
    }

    if (price === "") {
      setError("Price is required");
      return;
    }

    if (Number(price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      if (editingProduct) {
        const response = await fetch(
          `http://localhost:3000/api/products/${editingProduct.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              price: Number(price),
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong");
          return;
        }

        console.log(data);

        setEditingProduct(null);
      } else {
        const response = await fetch(
          "http://localhost:3000/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              price: Number(price),
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Something went wrong");
          return;
        }

        console.log(data);
      }

      setName("");
      setPrice("");

      await fetchProducts();
    } catch (error) {
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
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
    const confirmed = window.confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
      return;
    }
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

      <form onSubmit={handleSubmit}
        className="product-form">
        <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

        {error && <div className="form-error">{error}</div>}

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
        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingProduct
              ? "Update Product"
              : "Add Product"}
        </button>
      </form>

      <Products
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}


export default App;