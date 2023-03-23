import { Request, Response } from 'express'
import Poster, {IPoster} from '../models/Poster'
import fs from 'fs-extra'

const cloudinary = require('cloudinary').v2;
require('../config/cloudinary')

class PosterController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const data = await Poster.find()
            .sort('name')
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un problema al listar los Carteles '
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se han podido listar los Carteles',
                err
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const data = await Poster.findById(id)
            .exec()
            if(!data){
                return res.status(500).json({
                    success: false,
                    message: 'El Cartel no existe'
                })
            }
            res.json({
                success: true,
                data
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'No se ha podido listar el Cartel',
                err
            })
        }
    }

    public async add(req: Request, res: Response): Promise<Response> {
        try{
            const result = await cloudinary.uploader.upload(req.files[0].path)
            const newPoster: IPoster = new Poster({
                image: result.secure_url,
                publicId: result.public_id
            })
            await newPoster.save()
            await fs.unlink(req.files[0].path)
            res.json({
                success: true,
                data: newPoster
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido agregar el Cartel',
                err
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try{
            const {id} = req.params
            const removedPoster: IPoster = await Poster.findByIdAndRemove(id)
            if(!removedPoster){
                return res.status(400).json({
                    success: false,
                    message: 'El Cartel no existe'
                })
            }
            res.json({
                success: true,
                data: removedPoster
            })
        }catch(err){
            return res.status(400).json({
                success: false,
                message: 'No se ha podido eliminar el Cartel',
                err
            })
        }
    }
}

export const posterController = new PosterController()