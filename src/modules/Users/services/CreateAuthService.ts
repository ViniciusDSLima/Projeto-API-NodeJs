import User from "../typeorm/entities/Users";
import AppError from "@shared/errors/AppError";
import {getCustomRepository} from 'typeorm';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
    user: User,
    token: string;
}

class CreateAuthService {
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

    const token = sign({}, "	3634340d2ef2d20092a115487eeacf4f4f431cf9", {
      subject: user.id,
      expiresIn: '1d',
    })

    return {user, token};
  }
}

export default CreateAuthService;
