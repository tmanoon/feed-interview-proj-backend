import express from 'express'
import { getComments, addComment } from './comment.controller.js'

const router = express.Router()

router.get('/', getComments)
router.post('/', addComment)

export const commentRoutes = router