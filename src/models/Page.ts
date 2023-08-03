import { model, Document, Schema } from 'mongoose'

export interface IPage extends Document{
    chapter: Schema.Types.ObjectId
    image: string
    publicId: string
}

const pageSchema = new Schema({
    chapter: {
        type: Schema.Types.ObjectId,
        required: [true, 'El Capitulo del Manga es obligatorio'],
        ref: 'Chapter'
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