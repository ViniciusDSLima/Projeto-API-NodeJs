import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";
import { join } from "path";
import customerRouter from "@modules/customers/infra/http/routes/customers.routes";
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
const productsRouter = Router();
const productsController = new ProductsController();

customerRouter.use(isAuthenticated);

productsRouter.get("/", productsController.index);

productsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productsController.show);

productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name : Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required()
    }
  }), 
  productsController.create);

productsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]:{
      name : Joi.string().required(),
      price: Joi.number().precision(2),
      quantity: Joi.number().required,
    }
  }),
  productsController.update);

productsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productsController.delete);


export default productsRouter;
