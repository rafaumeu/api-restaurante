import { knex } from '@/database/knex'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

import {z} from 'zod'
class TableSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number()
      })

      const { table_id } = bodySchema.parse(request.body)

      const session = await knex<TableSessionsRepository>('table_sessions')
      .where({ table_id })
      .orderBy("opened_at", "desc")
      .first()

      if(session && !session.closed_at) {
        throw new AppError('Table session already open', 400)
      }
      if(!session) {
        throw new AppError('Table session not found', 404)
      }

      await knex<TableSessionsRepository>('table_sessions').insert({table_id, opened_at: knex.fn.now()})
      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionsRepository>('table_sessions')
      .orderBy("closed_at", "desc")
      return response.json(sessions)
    } catch (error) {
      next(error)
    }
  }
}

export { TableSessionsController }