import usersRoutes from './usersRoutes'
import mangaRoutes from './mangaRoutes'
import chapterRoutes from './chapterRoutes'
import authorRoutes from './authorRoutes'
import pagesRoutes from './pagesRoutes'
import posterRoutes from './posterRoutes'

import {Router} from 'express'

const router: Router = Router()

router.use('/auth', usersRoutes)
router.use('/manga', mangaRoutes)
router.use('/chapter', chapterRoutes)
router.use('/author', authorRoutes)
router.use('/pages', pagesRoutes)
router.use('/poster', posterRoutes)

export default router