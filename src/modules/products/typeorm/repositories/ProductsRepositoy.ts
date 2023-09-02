import { EntityRepository,In, Repository, Entity } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
  
  public findByName(name : string) {
    const product = this.findOne({
      where : {
        name,
      },
    });
    product; 
  }
}
