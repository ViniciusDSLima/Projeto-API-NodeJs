import AuthController from "@modules/Users/controllers/AuthController";
import authRouter from "@modules/Users/routes/Auth.routes";
import profileRouter from "@modules/Users/routes/Profile.routes";
import usersRouter from "@modules/Users/routes/Users.routes";
import passwordRouter from "@modules/Users/routes/password.route";
import customerRouter from "@modules/customers/infra/http/routes/customers.routes";
import ordersRouter from "@modules/orders/routes/Orders.routes";
import productsRouter from "@modules/products/routes/products.roules";
import { ro } from "date-fns/locale";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/auth", authRouter);
routes.use("/password", passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export default routes;
