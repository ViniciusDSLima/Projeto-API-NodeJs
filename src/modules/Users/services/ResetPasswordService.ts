import AppError from "@shared/errors/AppError";
import {NoVersionOrUpdateDateColumnError, getCustomRepository} from 'typeorm';
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import {hash} from 'bcryptjs';
import UserTokenRepository from "../infra/typeorm/repositories/UserTokenRepository";
import {isAfter, addHours} from "date-fns";

interface IRequest{
  token: string,
  password: string;

}

class ResetPasswordService {
  public async execute({ token, password }: IRequest ): Promise<void>{
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken){
        throw new AppError("User token does not exists!");
    }

    const user = await userRepository.findById(userToken.user_id);

    if(!user){
        throw new AppError("user does not exists. ");
    }

    console.log(userToken);
    
    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
        throw new AppError("Token expired");
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);

  }
}

export default ResetPasswordService;
