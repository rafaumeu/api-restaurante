import { Request, Response, NextFunction } from 'express'
import knex from 'knex'
class TableSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
     
      return response.json({message: 'ok'})
    } catch (error) {
      next(error)
    }
  }
}

export { TableSessionsController }