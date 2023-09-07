import AuthController from "@modules/Users/controllers/AuthController";
import authRouter from "@modules/Users/routes/Auth.routes";
import usersRouter from "@modules/Users/routes/Users.routes";
import productsRouter from "@modules/products/routes/products.roules";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/auth", authRouter);

export default routes;
