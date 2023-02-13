import { Request, Response } from 'express'
import Manga, {IManga} from '../models/Manga'

class MangaController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Manga.find()
            .sort('title')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Mangas '
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Mangas',
                err
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Manga.findById(id)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Manga no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar el Manga',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const {title, author, cover, background, description, available } = req.body
            const newManga: IManga = new Manga({
                title,
                author,
                cover,
                background,
                description,
                available
            })
            await newManga.save()
            res.json({
                success: true,
                data: newManga
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Manga',
                err
            })
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const {body} = req
            const updatedMove: IManga = await Manga.findByIdAndUpdate(id, body, {new: true})
            if(!updatedMove){
                return res.status(400).json({
                    success: false,
                    message: 'El Movimiento no existe'
                })
            }
            res.json({
                success: true,
                data: updatedMove
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Movimiento',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedManga: IManga = await Manga.findByIdAndRemove(id)
            if(!removedManga){
                return res.status(400).json({
                    success: false,
                    message: 'El Manga no existe'
                })
            }
            res.json({
                success: true,
                data: removedManga
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Manga',
                err
            })
        }
    }
}

export const mangaController = new MangaController()