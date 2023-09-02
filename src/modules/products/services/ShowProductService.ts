import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoy";
import Product from "../typeorm/entities/Product";
import AppError from '../../../shared/errors/AppError';

interface IRequest{
  id: string;
}

class ShowProductService {
  public async execute({id}: IRequest): Promise<Product | null>{
    const productRepositorys = getCustomRepository(ProductRepository);
    
    const product = await productRepositorys.findOneById(id);

    if(!product){
      throw new AppError("Product Not found");
    }

    return product;
    
  }
}

export default ShowProductService;