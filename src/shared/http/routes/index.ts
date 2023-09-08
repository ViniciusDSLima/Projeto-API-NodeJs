import AuthController from "@modules/Users/controllers/AuthController";
import authRouter from "@modules/Users/routes/Auth.routes";
import usersRouter from "@modules/Users/routes/Users.routes";
import passwordRouter from "@modules/Users/routes/password.route";
import productsRouter from "@modules/products/routes/products.roules";
import { ro } from "date-fns/locale";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/auth", authRouter);
routes.use("/password", passwordRouter);

export default routes;
