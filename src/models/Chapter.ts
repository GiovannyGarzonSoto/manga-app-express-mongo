import { model, Document, Schema } from 'mongoose'

export interface IChapter extends Document{
    number: number
    manga: Schema.Types.ObjectId
    author: Schema.Types.ObjectId
    title: string
    premiere?:  Date
    available: boolean
}

const chapterSchema = new Schema({
    number: {
        type: Number,
        required: [true, 'El numero del Capitulo es obligatorio'],
    },
    manga: {
        type: Schema.Types.ObjectId,
        required: [true, 'El Manga es obligatorio'],
        ref: 'Manga'
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, 'El Autor es obligatorio'],
        ref: 'Author'
    },
    title: {
        type: String,
    },
    premiere: {
        type: Date,
        default: new Date()
    },
    available: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
}) 

export default model<IChapter>('Chapter', chapterSchema)