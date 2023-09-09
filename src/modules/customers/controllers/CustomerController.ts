import { Request, Response } from "express";
import ListCustomersService from "../Services/ListCustomersService";
import ShowCustomerService from "../Services/ShowCustomerService";
import CreateCustomerService from "../Services/CreateCustomerService";
import UpdateCustomerService from "../Services/UpdateCustomerService";
import DeleteCustomerService from "../Services/DeleteCustomerService";


export default class CustomerController{
  public async index(req: Request, res: Response): Promise<Response>{
    const listCustomers = new ListCustomersService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const showCustomer = new ShowCustomerService();

    const product = await showCustomer.execute({id});

    return res.json(product);
  }

  public async create(req:Request, res: Response): Promise<Response>{
    const {name, email} = req.body;

    const createCustomer  = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name, email
    });


    return res.status(201).json(customer);
  }

  public async update(req:Request, res: Response): Promise<Response>{
    const {name, email} = req.body;
    const {id} = req.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,name, email
    });

    return res.json(customer);
  }

  public async delete(req:Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const deleteCustomer =  new DeleteCustomerService();
    
    await deleteCustomer.execute({id});

    return res.status(204);
  }
}
