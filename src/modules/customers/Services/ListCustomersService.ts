import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


class ListCustomersService {
    public async execute(): Promise<Customer[]>{
      const customerRepository = getCustomRepository(CustomersRepository);
      const customers = customerRepository.find();
  
  
      return customers;
      
    }
  }
  
  export default ListCustomersService;