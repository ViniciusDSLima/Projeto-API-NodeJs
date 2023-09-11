import AuthController from "@modules/Users/infra/http/controllers/AuthController";
import authRouter from "@modules/Users/infra/http/routes/Auth.routes";
import profileRouter from "@modules/Users/infra/http/routes/Profile.routes";
import usersRouter from "@modules/Users/infra/http/routes/Users.routes";
import passwordRouter from "@modules/Users/infra/http/routes/password.route";
import customerRouter from "@modules/customers/infra/http/routes/customers.routes";
import ordersRouter from "@modules/orders/infra/http/routes/Orders.routes";
import productsRouter from "@modules/products/infra/http/routes/products.roules";
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
