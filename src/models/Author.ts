import { model, Document, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator' 

export interface IAuthor extends Document{
    name: string
}

const authorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Autor es obligatorio'],
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false
})

authorSchema.plugin(uniqueValidator, {message: '{PATH} ya se encuentra utilizado'})

export default model<IAuthor>('Author', authorSchema)