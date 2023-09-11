import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoy";
import AppError from "@shared/errors/AppError";
import { promises } from "dns";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest{
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({name, price, quantity}: IRequest ): Promise<Product>{
    const productRepositorys = getCustomRepository(ProductRepository);
    const productExists = await productRepositorys.findByName(name);
    
    if(productExists !== undefined){
      throw new AppError("There is already one product with this name");
    }

    const redisCache = new RedisCache();

    const product = productRepositorys.create({
      name, 
      price,
      quantity
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    productRepositorys.save(product);

    return product;
    
  }
}

export default CreateProductService;
