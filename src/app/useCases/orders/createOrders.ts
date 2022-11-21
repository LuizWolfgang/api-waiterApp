import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function createOrders(req: Request, res: Response){
  try {
    const { table, products } = req.body

    const orders = await Order.create({ table, products })

    res.status(201).json(orders)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}
