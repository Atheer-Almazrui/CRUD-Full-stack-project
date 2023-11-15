import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:3003/products')
  }

  useEffect(() => {});

  return <div>App</div>;
};

export default App;
