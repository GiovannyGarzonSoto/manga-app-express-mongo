import {Router} from 'express'
import {authorController} from '../controllers/authorController'

const router: Router = Router()

router.get('/', authorController.getAll)

router.get('/:id', authorController.getOne)

router.post('/', authorController.add)

router.put('/:id', authorController.edit)

router.put('/delete/:id', authorController.delete)

export default router