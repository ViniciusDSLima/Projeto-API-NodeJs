import User from "../typeorm/entities/Users";
import AppError from "@shared/errors/AppError";
import {getCustomRepository} from 'typeorm';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { hasSubscribers } from "diagnostics_channel";
import { compare, hash } from "bcryptjs";

interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
    user: User,
}

class CreateSessionService {
  public async execute({ email, password}: IRequest ): Promise<IResponse>{
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if(!user){
        throw new AppError("Incorrect email/password combination ", 401);
    }

    const passowrdConfirmed = await compare(password, user.password);

    if(!passowrdConfirmed){
        throw new AppError("Incorrect email/password combination ", 401);
    }

    return user;
  }
}

export default CreateSessionService;
