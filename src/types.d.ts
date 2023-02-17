import { Request, Response } from 'express'

declare namespace Express {
    export interface Request {
        user: string | object
    }
}