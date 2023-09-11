import { TreeChildren, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";
import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositoy";
import { id } from "date-fns/locale";
import Product from "@modules/products/infra/typeorm/entities/Product";

interface IProduct{
    id:string;
    quantity: number;
}


interface IRequest{
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({customer_id, products}: IRequest ): Promise<Order>{
    const ordersRepositorys = getCustomRepository(OrdersRepository);
    const customerReposity = getCustomRepository(CustomersRepository);
    const productRepositorys = getCustomRepository(ProductRepository);
    
    const customerExists = await customerReposity.findById(customer_id);

    if(!customerExists){
        throw new AppError("could not find any customer with the given id. ");
    }

    const existisProducts = await productRepositorys.findAllByIds(products);

    if(!existisProducts.length){
        throw new AppError("could not find any products with the given ids");
    }

    const existsProductsId = existisProducts.map((product) => product.id);

    const checkInexistentsProducts = products.filter(
        prodcut => !existsProductsId.includes(prodcut.id),
    )

    if(!checkInexistentsProducts.length){
        throw new AppError(`could not find any products ${checkInexistentsProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
        product => existisProducts.filter(p => p.id === product.id)[0].quantity <  product.quantity,
    ) 

    if(quantityAvailable.length){
        throw new AppError(`the quantity ${quantityAvailable[0].quantity}
         is not available for
         ${quantityAvailable[0].id}`);
    }

    const serializedProducts = products.map(product =>({
        product_id: product.id,
        quantity: product.quantity,
        price: existisProducts.filter( p => p.id === product.id)[0].price,

    }));

    const order = await ordersRepositorys.CreateOrder({
        customer: customerExists,
        products: serializedProducts,
    });

    const {order_products} = order;

    const updatedProductQuantity = order_products.map(
        product => ({
            id:product.product_id,
            quantity:
                existisProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
        })
    );

    await productRepositorys.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
