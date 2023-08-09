"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pageSchema = new mongoose_1.Schema({
    chapter: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'El Capitulo del Manga es obligatorio'],
        ref: 'Chapter'
    },
    number: {
        type: Number,
        required: [true, 'El Numero de la Pagina es obligatorio'],
        ref: 'Chapter'
    },
    image: {
        type: String,
        required: [true, 'La Imagen de la Pagina es obligatoria'],
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico de la Pagina es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Page', pageSchema);
