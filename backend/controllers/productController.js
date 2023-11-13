import fs from "fs/promises";

let products = [
  { id: "1", name: "iphone 15", price: 3000 },
  { id: "2", name: "smart watch", price: 300 },
  { id: "3", name: "headphones", price: 100 },
];

const handleError = (statusCode, res, content) => {
  res.status(statusCode).send(content);
};

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

export const getSingleProduct = async (req, res) => {
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
    res.status(200).send({
      success: true,
      message: "Single product is returned",
      payload: product,
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      id: new Date().getTime().toString(),
      name: req.body.title,
      price: req.body.price,
    };

    const existingProducts = JSON.parse(
      await fs.readFile("products.json", "utf-8")
    );

    existingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(existingProducts));

    res.status(201).send({
      success: true,
      message: "new product is created",
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};

export const deleteProduct = async (req, res) => {
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

    res.status(200).send({
      success: true,
      message: "Single product is deleted",
    });
  } catch (error) {
    handleError(500, res, "server error");
  }
};

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
