import {Router} from 'express'
import {pagesController} from '../controllers/pagesController'
// import upload from '../middlewares/multer'

const router: Router = Router()

router.get('/', pagesController.getAll)

router.get('/:id', pagesController.getOne)

router.get('/chapter/:chapterId',  pagesController.getPagesByChapter)

router.post('/', pagesController.add)

router.put('/:id', pagesController.edit)

router.put('/delete/:id', pagesController.delete)

router.get('/chapter/:id/', pagesController.getPagesByChapter)

export default router