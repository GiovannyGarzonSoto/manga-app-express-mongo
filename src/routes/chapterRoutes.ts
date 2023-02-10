import {Router} from 'express'
import {mangaController} from '../controllers/mangaController'

const router: Router = Router()

router.get('/', mangaController.getAll)

router.get('/:id', mangaController.getOne)

router.post('/email-activate', mangaController.addOne)

router.put('/:id', mangaController.editOne)

router.put('/:id', mangaController.deleteOne)

export default router