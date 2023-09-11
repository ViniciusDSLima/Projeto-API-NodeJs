import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoy";
import Product from "../typeorm/entities/Product";
import AppError from '../../../shared/errors/AppError';
import RedisCache from "@shared/cache/RedisCache";

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({id,name,price,quantity}: IRequest): Promise<Product>{
    const productRepositorys = getCustomRepository(ProductRepository);
    
    const product = await productRepositorys.findOne(id);

    if(!product){
      throw new AppError("Product Not found");
    }

    const productExists = await productRepositorys.findByName(name);
    
    if(productExists !== undefined && name !== product.name){
      throw new AppError("There is already one product with this name");
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepositorys.save(product);
    
    return product;
  }
}

export default UpdateProductService;
