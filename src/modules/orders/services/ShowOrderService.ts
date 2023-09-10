import { TreeChildren, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepositoy";
import { id, th } from "date-fns/locale";
import Product from "@modules/products/typeorm/entities/Product";



interface IRequest{
  id: string;

}

class ShowOrderService {
  public async execute({id}: IRequest ): Promise<Order>{
    const ordersRepositorys = getCustomRepository(OrdersRepository);
    
    const order = await ordersRepositorys.findById(id);
    
    if(!order){
        throw new AppError("order not found");
    }

    return order;
  }
}

export default ShowOrderService;
