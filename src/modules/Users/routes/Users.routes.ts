import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import { join } from "path";
import exp from "constants";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";


const usersRouter = Router();
const usersController = new UsersController();
//necessita estar autenticado!!
usersRouter.get("/", isAuthenticated, usersController.index);
//nao necessita estar autenticado!!
usersRouter.post(
    "/",
    celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    }),
    usersController.create
);


export default usersRouter;


