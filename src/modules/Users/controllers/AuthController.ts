import { Request, Response } from "express";
import CreateAuthService from "../services/CreateAuthService";

export default class AuthController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {email, password} = req.body;

        const createAuth = new CreateAuthService();

        const user = await createAuth.execute({
            email, password
        });

        return res.json(user);
    }
}