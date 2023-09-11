import { Request, Response, response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import { instanceToInstance} from "class-transformer";

export default class ProfileController{
    public async show(req: Request, res: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        
        const user_id = req.user.id;

        const user = await showProfile.execute({user_id});

        return res.json(instanceToInstance(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.body;
        
        const { name, email, password, old_password} = req.body;

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        });
        

        return response.json(instanceToInstance(user));
    }
    
}