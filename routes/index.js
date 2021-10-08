import express from 'express'
import { getMessage, newMessage } from '../controller/messages.js'

const router = express.Router()

router.post('/new/',newMessage)
router.get('/sync/',getMessage)


export default router