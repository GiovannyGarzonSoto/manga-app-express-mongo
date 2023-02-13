import {Router} from 'express'
import {pagesController} from '../controllers/pagesController'

const router: Router = Router()

router.get('/', pagesController.getAll)

router.get('/:id', pagesController.getOne)

router.post('/', pagesController.add)

router.put('/:id', pagesController.edit)

router.put('/delete/:id', pagesController.delete)

export default router