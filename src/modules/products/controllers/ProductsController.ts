import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import Product from '../typeorm/entities/Product';
import { promises } from 'dns';
import { Repository } from 'typeorm';
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";
import { STATUS_CODES } from "http";


export default class ProductsController{
  public async index(req: Request, res: Response): Promise<Response>{
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({id});

    return res.json(product);
  }

  public async create(req:Request, res: Response): Promise<Response>{
    const {name, price, quantity} = req.body;

    const createProduct  = new CreateProductService();

    const product = await createProduct.execute({
      name, price, quantity,
    });


    return res.status(201).json(product);
  }

  public async update(req:Request, res: Response): Promise<Response>{
    const {name, price, quantity} = req.body;
    const {id} = req.params;

    const update = new UpdateProductService();

    const product = await update.execute({
      id,name, price, quantity,
    });

    return res.json(product);
  }

  public async delete(req:Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const remove =  new DeleteProductService();
    
    await remove.execute({id});

    return res.status(204);
  }
}
