import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import { join } from "path";
import exp from "constants";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import AuthController from "../controllers/AuthController";
import multer from "multer";
import uploadConfig from '@config/upload'
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new UserAvatarController();
const upload = multer(uploadConfig);


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

usersRouter.patch(
    "/avatar",
    isAuthenticated,
    upload.single("avatar"),
    avatarController.update,
    );

export default usersRouter;


