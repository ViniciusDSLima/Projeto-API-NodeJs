import { TreeChildren, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositoy";
import { id, th } from "date-fns/locale";
import Product from "@modules/products/infra/typeorm/entities/Product";



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
