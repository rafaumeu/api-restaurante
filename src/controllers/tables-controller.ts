import { knex } from '@/database/knex'
import {Request, Response, NextFunction} from 'express'

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>('tables')
      .orderBy("table_number")
      return response.json(tables)
    }catch (error) {
      next(error)
    }
  }
}

export { TablesController }