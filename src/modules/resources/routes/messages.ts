import { Router, type Request, type Response } from 'express'

import messagesController from '../controllers/messages'
import messagesValidator from '../utils/validator/messages'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const messages = await messagesController.listMessages(req)
    res.status(200).json(messages)
  } catch (error) {
    res.status(400).json({ message: 'Error getting messages' })
  }
}
)

router.post('/', messagesValidator.validateCreateMessage, async (req: Request, res: Response): Promise<void> => {
  try {
    const newMessage = await messagesController.createMessage(req)
    res.status(201).json(newMessage)
  } catch (error) {
    res.status(400).json({ message: 'Error creating message' })
  }
}
)

export default router
