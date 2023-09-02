import { ServerApiVersion, getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoy";
import Product from "../typeorm/entities/Product";
import AppError from '../../../shared/errors/AppError';

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class ShowProductService {
  public async execute({id,name,price,quantity}: IRequest): Promise<Product>{
    const productRepositorys = getCustomRepository(ProductRepository);
    const product = await productRepositorys.findOneById(id);

    if(!product){
      throw new AppError("Product Not found");
    }

    const productExists = await productRepositorys.findByName(name);
    
    if(productExists !== undefined && name !== product.name){
      throw new AppError("There is already one product with this name");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepositorys.save(product);
    
    return product;
  }
}

export default ShowProductService;
