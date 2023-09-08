import AppError from "@shared/errors/AppError";
import {NoVersionOrUpdateDateColumnError, getCustomRepository} from 'typeorm';
import UsersRepository from "../repositories/UsersRepository";
import UserTokenRepository from "../typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest{
  email: string;

}

class SendForgotPasswordEmailService {
  public async execute({email}: IRequest ): Promise<void>{
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if(!user){
        throw new AppError("User does not exists!");
    }
    const token = await userTokenRepository.generate(user.id);
    
   console.log(token);

    await EtherealMail.sendMail({
      to: email, body: `Solicitacao de redefinao de senha recebida : ${token?.token}`,
    })
  }
}

export default SendForgotPasswordEmailService;
