import User from "../infra/typeorm/entities/Users";
import AppError from "@shared/errors/AppError";
import {getCustomRepository} from 'typeorm';
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import authConfig from "@config/authConfig";

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

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {user, token};
  }
}

export default CreateAuthService;
