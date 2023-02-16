import express, {Application} from 'express' 
import morgan from 'morgan'
import routes from './routes'
import path from 'path'
import env from 'dotenv'
import cors from 'cors'
import multer from 'multer'

const app: Application = express()
env.config()

app.use(cors())
app.use(morgan('dev'))
app.set('port', process.env.PORT)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api', routes)

require('./config/cloudinary')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime()+path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));

app.use(express.static(path.join(__dirname, '../public')))

export default app