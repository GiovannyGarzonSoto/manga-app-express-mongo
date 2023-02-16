import { model, Document, Schema } from 'mongoose'

export interface IPage extends Document{
    number: number
    chapter: Schema.Types.ObjectId
    image: string
    publicId: string
}

const pageSchema = new Schema({
    number: {
        type: Number,
        required: [true, 'El numero del Capitulo es obligatorio'],
    },
    chapter: {
        type: Schema.Types.ObjectId,
        required: [true, 'El Capitulo del Manga es obligatorio'],
    },
    image: {
        type: String,
        required: [true, 'La Pagina del Capitulo es obligatoria'],
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico de la Pagina es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model<IPage>('Page', pageSchema)