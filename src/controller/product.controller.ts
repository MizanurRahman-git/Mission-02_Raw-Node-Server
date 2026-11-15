import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParse } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const products = productService();
  const url = req?.url;
  const method = req?.method;
  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  const product = products.find((p: IProduct) => p.id === id);

  const body = await bodyParse(req);

  const index = products.findIndex((p: IProduct)=> p.id === id)

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrived Successfully...",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Retrived Successfully...",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);

    createProduct(products);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Created Successfully...",
        data: products,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    console.log(index);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated Successfully...",
        // data: products,
      }),
    );
  }
};

export default productController;
