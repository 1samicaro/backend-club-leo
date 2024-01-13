import type { Request } from 'express'

import messagesServices from '../services/messages'
import type { Message } from '../types/messages'

const listMessages = async (req: Request): Promise<Message[]> => {
  const messages = await messagesServices.getMessages()
  return messages
}

const createMessage = async (req: Request): Promise<Message> => {
  const newMessage = req.body
  const message = await messagesServices.postMessage(newMessage)
  return message
}

const messagesController = { createMessage, listMessages }

export default messagesController
