import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { join } from "path";
import CustomerController from "../controllers/CustomerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.get("/", customerController.index);

customerRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customerController.show);

customerRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name : Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }), 
  customerController.create);

customerRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]:{
        name : Joi.string().required(),
        email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
  }),
  customerController.update);

customerRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  customerController.delete);


export default customerRouter;
