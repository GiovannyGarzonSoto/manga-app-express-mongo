import { Request, Response } from 'express'
import Chapter from '../models/Chapter'
import Page, {IPage} from '../models/Page'
import fs from 'fs-extra'

const cloudinary = require('cloudinary').v2;
require('../config/cloudinary')

class PagesController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Page.find()
            .populate('chapter')
            .sort('number')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar las Paginas '
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar las Paginas',
                err
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Page.findById(id)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'La pagina no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar la Pagina',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const {chapter, number} = req.body
            const result = await cloudinary.uploader.upload(req.files[0].path)            
            const newPage: IPage = new Page({
                chapter,
                number,
                image: result.secure_url,
                publicId: result.public_id
            })
            await newPage.save()
            await fs.unlink(req.files[0].path)
            res.json({
                success: true,
                data: newPage
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar la Pagina',
                err
            })
        }
    }

    public async edit(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const {body} = req
            const result = await cloudinary.uploader.upload(req.files[0].path)
            const edited = {
                ...body,
                image: result.secure_url,
                publicId: result.public_id
            }
            const updatedPage: IPage = await Page.findByIdAndUpdate(id, edited, {new: true})
            if(!updatedPage){
                return res.status(400).json({
                    success: false,
                    message: 'La Pagina no existe'
                })
            }
            res.json({
                success: true,
                data: updatedPage
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido actualizar la Pagina',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedPage: IPage = await Page.findByIdAndRemove(id)
            if(!removedPage){
                return res.status(400).json({
                    success: false,
                    message: 'La Pagina no existe'
                })
            }
            res.json({
                success: true,
                data: removedPage
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar la Pagina',
                err
            })
        }
    }

    public async getPagesByChapter(req: Request, res: Response): Promise<Response> {
        try{
            const {chapterId} = req.params
            const chapter = await Chapter.findById(chapterId)
            const pages = await Page.find({chapter: chapterId})
            return res.json({
                success: true,
                data: {
                    chapter,
                    pages
                }
            })
        }catch(err) {
            return res.json({
                success: false,
                message: 'No se han podido listar las Paginas por Capitulo'
            })
        }
    }
}

export const pagesController = new PagesController()