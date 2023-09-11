import AppError from "@shared/errors/AppError";
import {NoVersionOrUpdateDateColumnError, getCustomRepository} from 'typeorm';
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UserTokenRepository from "../infra/typeorm/repositories/UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';

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
    const {token} = await userTokenRepository.generate(user.id);
    
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'Views',
      'forgot_password.hbs',
    );
    await EtherealMail.sendMail({
     to: {
      name: user.name,
      email: user.email,
     },
    
    subject: "[API Vendas] Recuperacao de senha",
    templateData: {
      file : forgotPasswordTemplate,
      variables: {
        name: user.name,
        link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
      },
    },
    });
  }
}

export default SendForgotPasswordEmailService;
