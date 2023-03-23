import {Router} from 'express'
import {posterController} from '../controllers/posterController'

const router: Router = Router()

router.get('/', posterController.getAll)

router.get('/:id', posterController.getOne)

router.post('/', posterController.add)

router.put('/delete/:id', posterController.delete)

export default router