import { Request, Response } from "express";
import { promises } from 'dns';
import { Repository } from 'typeorm';
import { STATUS_CODES } from "http";
import ShowOrderService from "@modules/orders/services/ShowOrderService";
import CreateOrderService from "@modules/orders/services/CreateOrderService";


export default class OrdersController{

  public async show(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({id});

    return res.json(order);
  }

  public async create(req:Request, res: Response): Promise<Response>{
    const {customer_id, products} = req.body;

    const createOrder  = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id, products
    });


    return res.status(201).json(order);
  }

}
