import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositoy";
import Product from "../infra/typeorm/entities/Product";


class ListProductService {
  public async execute(): Promise<Product[]>{
    const productRepositorys = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();


    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if(!products){
      products = await productRepositorys.find();
    
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }
    

    return products;
  }
}

export default ListProductService;
