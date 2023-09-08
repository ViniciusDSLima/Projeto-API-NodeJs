import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import AuthController from "../controllers/AuthController";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";


const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassordController = new ResetPasswordController();

passwordRouter.post(
    "/forgot",
    celebrate({
    [Segments.BODY] : {
        email: Joi.string().email().required(),
    }
    }),
    forgotPasswordController.create,
);

passwordRouter.post(
    "/reset",
    celebrate({
    [Segments.BODY] : {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
    }),
    resetPassordController.create,
);




export default passwordRouter;


