import { model, Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator' 

export interface IManga extends Document{
    title: string
    author: Schema.Types.ObjectId
    cover: string
    background: string
    description: string
    available: boolean
}

const mangaSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El nombre del Manga es obligatorio'],
        unique: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'El Autor es obligatorio'],
    },
    cover: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'La descripcion del Manga es obligatoria'],
    },
    available: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

mangaSchema.plugin(uniqueValidator, {message: '{PATH} ya se encuentra utilizado'})

export default model<IManga>('Manga', mangaSchema)