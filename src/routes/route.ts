import type { IncomingMessage, ServerResponse } from "http";
import productController from "../controller/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    // console.log("This is Root Route");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is Root Route..." }));
  } else if (url?.startsWith("/products")) {
    productController(req, res)
  } else {
    // console.log("This is not define");
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "This is not define..." }));
  }
};

export default routeHandler;
