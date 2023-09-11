import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomer } from "../models/ICretateCustomer";
import { ICustomer } from "../models/ICustomer"

export interface ICustomerRepository{
    findByName(name:string): Promise<ICustomer | undefined>;
    findById(id:string): Promise<ICustomer| undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    crete(data: ICreateCustomer): Promise<ICustomer>;
    save(customer:ICustomer): Promise<ICustomer>;
}