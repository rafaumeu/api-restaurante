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

      const session = await knex<TableSessionsRepository>('tables_sessions')
      .where({ table_id })
      .orderBy("opened_at", "desc")
      .first()

      if(session && !session.closed_at) {
        throw new AppError('Table session already open', 400)
      }
     
      await knex<TableSessionsRepository>('tables_sessions').insert({table_id, opened_at: knex.fn.now()})
      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionsRepository>('tables_sessions')
      .orderBy("closed_at")
      return response.json(sessions)
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
      .string()
      .transform((value) => Number(value))
      .refine((value) => !isNaN(value), { message: 'id must be a number' })
      .parse(request.params.id)
      const sessions = await knex<TableSessionsRepository>('tables_sessions')
      .where({id})
      .first()

      if(!sessions) {
        throw new AppError('Table session not found', 404)
      }

      if(sessions.closed_at) {
        throw new AppError('Table session already closed', 400)
      }
      await knex<TableSessionsRepository>('tables_sessions').update({closed_at: knex.fn.now()}).where({id})
      return response.json()
    } catch (error) {
      next(error)
    }
  } 
}

export { TableSessionsController }