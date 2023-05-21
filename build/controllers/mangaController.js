"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangaController = void 0;
var Manga_1 = __importDefault(require("../models/Manga"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var cloudinary = require('cloudinary').v2;
require('../config/cloudinary');
var MangaController = /** @class */ (function () {
    function MangaController() {
    }
    MangaController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Manga_1.default.find()
                                .sort('title')
                                .populate('author')
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'Ha ocurrido un problema al listar los Mangas '
                                })];
                        }
                        res.json({
                            success: true,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'No se han podido listar los Mangas',
                                err: err_1
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MangaController.prototype.getMangasByViews = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Manga_1.default.find()
                                .sort({ views: 'desc' })
                                .populate('author')
                                .limit(3)
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'Ha ocurrido un problema al listar los Mangas por vistas'
                                })];
                        }
                        res.json({
                            success: true,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'No se han podido listar los Mangas por vistas',
                                err: err_2
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MangaController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Manga_1.default.findById(id)
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'El Manga no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'No se ha podido listar el Manga',
                                err: err_3
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MangaController.prototype.add = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, author, description, available, resultCover, resultBackground, newManga, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, title = _a.title, author = _a.author, description = _a.description, available = _a.available;
                        return [4 /*yield*/, cloudinary.uploader.upload(req.files[0].path)];
                    case 1:
                        resultCover = _b.sent();
                        return [4 /*yield*/, cloudinary.uploader.upload(req.files[1].path)];
                    case 2:
                        resultBackground = _b.sent();
                        newManga = new Manga_1.default({
                            title: title,
                            author: author,
                            images: {
                                cover: resultCover.secure_url,
                                coverId: resultCover.public_id,
                                background: resultBackground.secure_url,
                                backgroundId: resultBackground.public_id
                            },
                            description: description,
                            available: available
                        });
                        return [4 /*yield*/, newManga.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, fs_extra_1.default.unlink(req.files[0].path)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, fs_extra_1.default.unlink(req.files[1].path)];
                    case 5:
                        _b.sent();
                        res.json({
                            success: true,
                            data: newManga
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        err_4 = _b.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido agregar el Manga',
                                err: err_4
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MangaController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, body, resultCover, resultBackground, edited, updatedMove, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = req.params.id;
                        body = req.body;
                        return [4 /*yield*/, cloudinary.uploader.upload(req.files[0].path)];
                    case 1:
                        resultCover = _a.sent();
                        return [4 /*yield*/, cloudinary.uploader.upload(req.files[1].path)];
                    case 2:
                        resultBackground = _a.sent();
                        edited = __assign(__assign({}, body), { images: {
                                cover: resultCover.secure_url,
                                coverId: resultCover.public_id,
                                background: resultBackground.secure_url,
                                backgroundId: resultBackground.public_id
                            } });
                        return [4 /*yield*/, Manga_1.default.findByIdAndUpdate(id, edited, { new: true })];
                    case 3:
                        updatedMove = _a.sent();
                        if (!updatedMove) {
                            return [2 /*return*/, res.status(400).json({
                                    success: false,
                                    message: 'El Manga no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: updatedMove
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido actualizar el Manga',
                                err: err_5
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MangaController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, removedManga, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Manga_1.default.findByIdAndRemove(id)];
                    case 1:
                        removedManga = _a.sent();
                        if (!removedManga) {
                            return [2 /*return*/, res.status(400).json({
                                    success: false,
                                    message: 'El Manga no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: removedManga
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido eliminar el Manga',
                                err: err_6
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MangaController;
}());
exports.mangaController = new MangaController();
