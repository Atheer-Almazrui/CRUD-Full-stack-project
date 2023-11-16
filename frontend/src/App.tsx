import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

type Product = {
  id: number;
  name: string;
  price: number;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
  });

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3003/products");
    setProducts(data.payload);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3003/products/${id}`);
    fetchProducts();
  };

  const createProduct = async (product: Product) => {
    await axios.post("http://localhost:3003/products", product);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setProduct((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createProduct(product);
    setProduct({
      name: "",
      price: 0,
    });
  };

  return (
    <div className="div-form">
      <form action="POST" onSubmit={handleSubmit}>
        <h2> Add new Product</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="div-card">
        {products.length > 0 &&
          products.map((product: Product) => {
            return (
              <div className="card" key={product.id}>
                <div className="action">
                  <h3
                    className="delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    ❌
                  </h3>
                  <h3 className="delete">🖊️</h3>
                </div>
                <h1>ID: {product.id}</h1>
                <p className="price">${product.price}</p>
                <p>{product.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
