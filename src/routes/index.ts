import usersRoutes from './usersRoutes'
import mangaRoutes from './mangaRoutes'
import chapterRoutes from './chapterRoutes'
import {Router} from 'express'

const router: Router = Router()

router.use('/auth', usersRoutes)
router.use('/manga', mangaRoutes)
router.use('/chapter', chapterRoutes)

export default router