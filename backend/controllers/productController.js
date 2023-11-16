import fs from "fs/promises";

let products = JSON.parse(await fs.readFile("products.json", "utf-8"));

const handleError = (statusCode, res, content) => {
  res.status(statusCode).send(content);
};

// GET: /products -> return all the products
export const getAllProducts = async (req, res) => {

  try {
    res.status(200).send({
      success: true,
      message: "All products are returned",
      payload: products,
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};

// GET: /products/:id -> get single product
export const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      const error = new Error(`product is not found with this id ${id}`);
      error.status = 404;
      throw error;
    }
    res.status(200).send({
      success: true,
      message: "Single product is returned",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST: /products -> create a product
export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      id: new Date().getTime().toString(),
      name: req.body.title,
      price: req.body.price,
    };

    products.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(products));

    res.status(201).send({
      success: true,
      message: "new product is created",
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};

// DELETE: /products/:id -> delete single product
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
      return;
    }
    const filteredProducts = products.filter((product) => product.id !== id);
    products = filteredProducts;
    await fs.writeFile("products.json", JSON.stringify(products));
    
    res.status(200).send({
      success: true,
      message: "Single product is deleted",
    });
  } catch (error) {
    next(error);
  }
};

// PUT: /products/:id -> update single product
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price } = req.body;
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
      res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
      return;
    }

    products[index].name = title ?? title;
    products[index].price = price ?? price;

    res.status(200).send({
      success: true,
      message: "product is updated",
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};
