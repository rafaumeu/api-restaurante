import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction} from "express";
import {z} from "zod";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        tables_sessions_id: z.number(),
        products_id: z.number(),
        quantity: z.number()
      })

      const {tables_sessions_id, products_id, quantity} = bodySchema.parse(request.body)
      
      const session = await knex<TableSessionsRepository>('tables_sessions').where({id: tables_sessions_id}).first()

      if(!session) {
        throw new AppError('Table session not found', 404)
      }

      if(session.closed_at) {
        throw new AppError('Table session already closed', 400)
      }

      const product = await knex<ProductRepository>('products')
      .where({id: products_id})
      .first()

      if(!product) {
        throw new AppError('Product not found', 404)
      }
      await knex<OrderRepository>('orders').insert({
        tables_sessions_id,
        products_id,
        quantity,
        price: product.price * quantity
      })
      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}


export { OrdersController }