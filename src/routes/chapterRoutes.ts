import {Router} from 'express'
import {chapterController} from '../controllers/chapterController'

const router: Router = Router()

router.get('/', chapterController.getAll)

router.get('/:id', chapterController.getOne)

router.get('/manga/:manga', chapterController.getChaptersByManga)

router.post('/', chapterController.add)

router.put('/:id', chapterController.edit)

router.put('/delete/:id', chapterController.delete)

export default router