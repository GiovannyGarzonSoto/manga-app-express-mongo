"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chapterController_1 = require("../controllers/chapterController");
var router = (0, express_1.Router)();
router.get('/', chapterController_1.chapterController.getAll);
router.get('/:id', chapterController_1.chapterController.getOne);
router.get('/manga/:mangaId', chapterController_1.chapterController.getChaptersByManga);
router.post('/', chapterController_1.chapterController.add);
router.put('/:id', chapterController_1.chapterController.edit);
router.put('/delete/:id', chapterController_1.chapterController.delete);
exports.default = router;
