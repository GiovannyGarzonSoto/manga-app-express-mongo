import { Request, Response } from 'express'
import Chapter, {IChapter} from '../models/Chapter'

class ChapterController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Chapter.find()
            .sort('number')
            .populate('manga')
            .populate('author')
            .exec()
            if(!data){   
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Capitulos'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Capitulos',
                err
            })
        }
    }

    public async getChaptersByManga(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Chapter.find({manga: req.params.mangaId})
            if(!data){   
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Capitulos por Manga'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err) {
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Capitulos por Manga',
                err
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Chapter.findById(id)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Capitulo no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar el Capitulo',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const {number, manga, title, premiere, available, author} = req.body
            const newChapter: IChapter = new Chapter({
                number,
                manga,
                title,
                premiere,
                available,
                author
            })
            await newChapter.save()
            res.json({
                success: true,
                data: newChapter
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Capitulo',
                err
            })
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const {body} = req
            const updatedChapter: IChapter = await Chapter.findByIdAndUpdate(id, body, {new: true})
            if(!updatedChapter){
                return res.status(400).json({
                    success: false,
                    message: 'El Capitulo no existe'
                })
            }
            res.json({
                success: true,
                data: updatedChapter
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Capitulo',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removeChapter: IChapter = await Chapter.findByIdAndRemove(id)
            if(!removeChapter){
                return res.status(400).json({
                    success: false,
                    message: 'El Capitulo no se ha podido eliminar'
                })
            }
            res.json({
                success: true,
                data: removeChapter
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Capitulo',
                err
            })
        }
    }
}

export const chapterController = new ChapterController()