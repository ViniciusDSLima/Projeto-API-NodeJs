import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepositoy";
import Product from "../infra/typeorm/entities/Product";
import AppError from '../../../shared/errors/AppError';

interface IRepository{
  id: string;
}

class ShowProductService {
  public async execute(id: IRepository): Promise<Product | null>{
    const productRepositorys = getCustomRepository(ProductRepository);
    
    const product = await productRepositorys.findOne(id);

    if(!product){
      throw new AppError("Product Not found");
    }

    return product;
    
  }
}

export default ShowProductService;
