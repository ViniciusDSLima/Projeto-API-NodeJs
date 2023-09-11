import { Request, Response } from "express";
import ListUserService from "@modules/Users/services/ListUserService";
import CreateUserService from "@modules/Users/services/CreateUserService";
import { instanceToInstance } from "class-transformer";

export default class UsersController{
    public async index(req: Request, res: Response): Promise<Response>{
        const listUser = new ListUserService();

        console.log(req.user.id);

        const users = await listUser.execute();

        return res.json(instanceToInstance(users));
    }
    public async create(req: Request, res: Response): Promise<Response>{
        const {name, email, password}= req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({name, email, password});
        
        return res.status(201).json(instanceToInstance(user));
    }
}