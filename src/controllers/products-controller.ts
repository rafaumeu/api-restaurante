import { knex } from '@/database/knex';
import { NextFunction, Request, Response } from 'express';
import {z} from 'zod';


class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      
      return response.json({ message: 'ok' });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0)
      })
      const { name, price } = bodySchema.parse(request.body);
      await knex<ProductRepository>('products').insert({ name, price });
      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController }
