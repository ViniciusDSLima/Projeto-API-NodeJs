import { Request, Response } from "express";
import CreateAuthService from "@modules/Users/services/CreateAuthService";
import { instanceToInstance } from "class-transformer";

export default class AuthController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        const createAuth = new CreateAuthService();

        const user = await createAuth.execute({
            email, password
        });

        return res.json(instanceToInstance(user));
    }
}