import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomer } from "../models/ICretateCustomer";
import { ICustomer } from "../models/ICustomer"

export interface ICustomerRepository{
    findByName(name:string): Promise<Customer | undefined>;
    findById(id:string): Promise<Customer| undefined>;
    findByEmail(email: string): Promise<Customer | undefined>;
    crete(data: ICreateCustomer): Promise<Customer>;
    save(customer:ICustomer): Promise<Customer>;
}