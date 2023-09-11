import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositoy";
import Product from "../infra/typeorm/entities/Product";
import AppError from '../../../shared/errors/AppError';
import RedisCache from "@shared/cache/RedisCache";

interface IRequest{
  id: string;
}

class DeleteProductService {
  public async execute({id}: IRequest): Promise<void>{
    const productRepositorys = getCustomRepository(ProductRepository);
    
    const product = await productRepositorys.findOne(id);

    const redisCache = new RedisCache();

    if(!product){
      throw new AppError("Product Not found");
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepositorys.remove(product);
    
  }
}

export default DeleteProductService;
