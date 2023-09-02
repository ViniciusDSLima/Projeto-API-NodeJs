import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepositoy";
import Product from "../typeorm/entities/Product";



class ListProductService {
  public async execute(): Promise<Product[]>{
    const productRepositorys = getCustomRepository(ProductRepository);
    const products = productRepositorys.find();


    return products;
    
  }
}

export default ListProductService;
