import { Router } from "express";
import { productsRoutes } from "./product-routes";

const routes = Router();

routes.use("/products", productsRoutes);

export { routes };