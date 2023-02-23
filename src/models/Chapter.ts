import { model, Document, Schema } from 'mongoose'

export interface IChapter extends Document{
    number: number
    manga: Schema.Types.ObjectId
    title: string
    premiere: boolean | Date
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
    },
    title: {
        type: String,
    },
    premiere: {
        type: Date,
        default: false
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