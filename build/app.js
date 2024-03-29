"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var multer_1 = __importDefault(require("./middlewares/multer"));
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.set('port', process.env.PORT);
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(multer_1.default.any());
app.use('/api', routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.default = app;
