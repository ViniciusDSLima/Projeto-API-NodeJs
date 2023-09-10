import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { join } from "path";
import customerRouter from "@modules/customers/routes/customers.routes";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import OrdersController from "../controller/OrderController";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";


const ordersRouter = Router();
const ordersController = new OrdersController();

customerRouter.use(isAuthenticated);


ordersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ordersController.show);

ordersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }), 
  ordersController.create);


export default ordersRouter;
