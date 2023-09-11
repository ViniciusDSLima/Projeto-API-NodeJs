import AppError from "@shared/errors/AppError";
import {getCustomRepository} from 'typeorm';
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";
import { custom } from "joi";

interface IRequest{
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({name, email}: IRequest ): Promise<Customer>{
    const customerRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customerRepository.findByEmail(email);

    if(emailExists){
        throw new AppError("Email address alread used.");
    }

    
    const customer = customerRepository.create({
        name, email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
