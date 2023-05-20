import {Router} from 'express'
import {mangaController} from '../controllers/mangaController'

const router: Router = Router()

router.get('/', mangaController.getAll)

router.get('/views', mangaController.getMangasByViews)

router.get('/:id', mangaController.getOne)

router.post('/', mangaController.add)

router.put('/:id', mangaController.edit)

router.put('/delete/:id', mangaController.delete)

export default router