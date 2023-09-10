import { EntityRepository,In, Repository, Entity } from 'typeorm';
import Product from '../entities/Product';
import { promises } from 'dns';

interface IFindProducts{
  id:string;
}

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

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(products => products.id);
    
    const existisProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existisProducts;
  }
}
