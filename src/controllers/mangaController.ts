import { Request, Response } from 'express'
import Manga, {IManga} from '../models/Manga'
import fs from 'fs-extra'

const cloudinary = require('cloudinary').v2;
require('../config/cloudinary')

class MangaController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Manga.find()
            .sort('title')
            .populate('author')
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

    public async getMangasByViews(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Manga.find()
            .sort({views: 'desc'})
            .populate('author')
            .limit(3)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Mangas por vistas'
                })
            }
            res.json({
                success: true,
                data: data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Mangas por vistas',
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
            const {title, author, description, available, state } = req.body
            const resultCover = await cloudinary.uploader.upload(req.files[0].path)
            const resultBackground = await cloudinary.uploader.upload(req.files[1].path)  
            const newManga: IManga = new Manga({
                title,
                author,
                images: {
                    cover: resultCover.secure_url,
                    coverId: resultCover.public_id,
                    background: resultBackground.secure_url,
                    backgroundId: resultBackground.public_id
                },
                description,
                available,
                state
            })
            await newManga.save()
            await fs.unlink(req.files[0].path)
            await fs.unlink(req.files[1].path)
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
            const resultCover = await cloudinary.uploader.upload(req.files[0].path)  
            const resultBackground = await cloudinary.uploader.upload(req.files[1].path)  
            const edited = {
                ...body,
                images: {
                    cover: resultCover.secure_url,
                    coverId: resultCover.public_id,
                    background: resultBackground.secure_url,
                    backgroundId: resultBackground.public_id
                },
            }
            const updatedManga: IManga = await Manga.findByIdAndUpdate(id, edited, {new: true})
            if(!updatedManga){
                return res.status(400).json({
                    success: false,
                    message: 'El Manga no existe'
                })
            }
            res.json({
                success: true,
                data: updatedManga
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar el Manga',
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