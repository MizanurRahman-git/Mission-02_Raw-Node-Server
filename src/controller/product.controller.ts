import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const products = productService();
  const url = req?.url;
  const method = req?.method;
  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  const product = products.find((p: IProduct) => p.id === id);

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
  }
};

export default productController;
