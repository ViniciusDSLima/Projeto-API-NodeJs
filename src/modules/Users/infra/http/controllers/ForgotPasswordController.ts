import { Request, Response } from "express";
import ListUserService from "@modules/Users/services/ListUserService";
import CreateUserService from "@modules/Users/services/CreateUserService";
import SendForgotPasswordEmailService from "@modules/Users/services/SendForgotPasswordEmailService";

export default class ForgotPasswordController{
    public async create(req: Request, res: Response): Promise<Response>{
        const { email}= req.body;


        const sendForgortPassword = new SendForgotPasswordEmailService();

        await sendForgortPassword.execute({
            email,
        });

        return res.status(204).json();
    }
}