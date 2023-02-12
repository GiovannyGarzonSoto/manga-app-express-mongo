import { Request, Response } from 'express'
import Author, {IAuthor} from '../models/Author'

class AuthorController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Author.find()
            .sort('name')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Autores '
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Autores',
                err
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Author.findById(id)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Autor no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar el Autor',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const {name} = req.body
            const newAuthor: IAuthor = new Author({
                name
            })
            await newAuthor.save()
            res.json({
                success: true,
                data: newAuthor
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Autor',
                err
            })
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const {body} = req
            const updatedAuthor: IAuthor = await Author.findByIdAndUpdate(id, body, {new: true})
            if(!updatedAuthor){
                return res.status(400).json({
                    success: false,
                    message: 'El Autor no existe'
                })
            }
            res.json({
                success: true,
                data: updatedAuthor
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Autor',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedAuthor: IAuthor = await Author.findByIdAndRemove(id)
            if(!removedAuthor){
                return res.status(400).json({
                    success: false,
                    message: 'El Autor no existe'
                })
            }
            res.json({
                success: true,
                data: removedAuthor
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Autor',
                err
            })
        }
    }
}

export const authorController = new AuthorController()